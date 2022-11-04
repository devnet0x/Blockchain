// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Figura.sol"; 

contract Cuadrado is Figura {
    uint _largo;

    constructor (uint largo){
        _largo=largo;
    }

    function verPerimetro() public override virtual returns (uint){
        return (_largo*4);
    }
}
