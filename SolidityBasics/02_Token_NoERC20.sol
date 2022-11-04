// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/*hacer una criptomoneda con balances
y que puedan transferir entre ellos
ademas debe haber un usuario admin (el que crea el contrato) y 
el puede emitir moneda.*/

contract MiToken{
    mapping (address => uint256) libroContable;
    address owner;

    constructor(){
        owner=msg.sender;
    }

    function emitir(address destino,uint256 cantidad) public{
        require(msg.sender==owner,"Solo el owner puede emitir");
        libroContable[destino]+=cantidad;
    }

    function consultaSaldo(address cuenta) public view returns(uint256){
        return(libroContable[cuenta]);
    }

    function transferir(address destino,uint256 cantidad) public{
        require(libroContable[msg.sender]>=cantidad,"Saldo insuficiente");
        libroContable[msg.sender]-=cantidad;
        libroContable[destino]+=cantidad;

    }

}
