// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Figura.sol"; 

contract Circulo is Figura {
    uint _radio;

    constructor (uint radio){
        _radio=radio;
    }

    function verPerimetro() public override virtual returns (uint){
        return (_radio*3);
    }
}
