// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract LlamadorVisitas {
    address direccionContrato;

    function llamarVerMensaje(address direccionContrato) public returns (uint,string memory, address){
        //si existe la funcion la llama, sino llama al fallback
        (bool anduvo,bytes memory respuesta) =direccionContrato.call(abi.encodeWithSignature("verMensaje()"));
        require(anduvo,"Algo fallo");
        //(ultimoPost[msg.sender], ultimaVisita.mensaje, ultimaVisita.autor);
        //(uint resultado)=abi.decode(respuesta,(uint));
        //(uint timestamp, string memory mensaje, address autori)=abi.decode(respuesta,(uint, string, address));
        //return resultado;
        return abi.decode(respuesta,(uint,string,address));
    }

    function llamarDonarReceive(address direccionContrato,uint monto) public returns (uint){
        //si existe la funcion la llama, sino llama al fallback
        (bool anduvo,) = direccionContrato.call{value:monto}("");
        require(anduvo,"Algo fallo");
    }

    function llamarDonarFallback(address direccionContrato,uint monto) public returns (uint){
        //si existe la funcion la llama, sino llama al fallback
        (bool anduvo,) =direccionContrato.call{value:monto}(abi.encodeWithSignature("noexiste()"));
        require(anduvo,"Algo fallo");
    }

    function llamarDonar(address direccionContrato,uint monto) public returns (uint){
        //si existe la funcion la llama, sino llama al fallback
        (bool anduvo,) =direccionContrato.call{value:monto}(abi.encodeWithSignature("donar()"));
        require(anduvo,"Algo fallo");
    }

    function verBalanceContrato() public  returns(uint){
        return address(this).balance;
    } 

    receive() external payable { //receive es para trx sin parametros
        require(msg.value>0,"Hay que mandar saldo mayor a 0");
    }
}
