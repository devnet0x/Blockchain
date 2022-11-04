// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract LlamadorCall {
    address direccionContrato;

    function llamarFuncion(address direccionContrato) public returns (uint){
        //si existe la funcion la llama, sino llama al fallback
        (bool anduvo,bytes memory respuesta) =direccionContrato.call(abi.encodeWithSignature("verBalanceContrato()"));
        require(anduvo,"Algo fallo");
        (uint resultado)=abi.decode(respuesta,(uint));
        return resultado;
    }
}
