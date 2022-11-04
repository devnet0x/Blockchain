// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Secreto {
    address public owner;
    uint private numeroSecreto;

    constructor(){
        owner=msg.sender;
    }

    function verSecreto() public view returns(uint){
        require(owner==msg.sender);
        return numeroSecreto;
    }
}
//Este es para probar que los numeros pasados como parametros quedan en blockchain publicos!
