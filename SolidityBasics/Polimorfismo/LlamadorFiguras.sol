// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Figura.sol";

contract Llamador {

    function verPerimetro(address direccionContrato) public returns(uint){
        Figura figura=Figura(direccionContrato);
        return figura.verPerimetro(); 
    }

    function verPerimetroPorCall(address direccionContrato) public returns(uint){
        (bool anduvo, bytes memory resultado)=direccionContrato.call(abi.encodeWithSignature("verPerimetro"));
        if (anduvo){
            return abi.decode(resultado,(uint));
        }
        return 0;
    }
}
