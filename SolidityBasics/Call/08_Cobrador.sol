// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Cobrador {

    string public porDondePaso;

    function verBalanceContrato() public  returns(uint){
        porDondePaso="balance";
        return address(this).balance;
    } 

    function a() public  returns (bytes memory){
        porDondePaso="a";
        return abi.encodeWithSignature("verBalanceContrato()");
    }

    function cobrar() public payable{
        porDondePaso="cobrar";
        require(msg.value>0,"Hay que mandar saldo mayor a 0");
    }

    receive() external payable { //receive es para trx sin parametros
        porDondePaso="receive";
        require(msg.value>0,"Hay que mandar saldo mayor a 0");
    }

    fallback() external payable { //fallback es para trx sin parametros
        porDondePaso="Fallback";

        direccionContrato.call()
    }
}
