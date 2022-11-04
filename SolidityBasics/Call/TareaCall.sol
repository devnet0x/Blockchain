// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract LibroVisitas {

    struct Visita {
        string mensaje;
        address autor;
    }

    Visita ultimaVisita;

    mapping(address => uint) ultimoPost;

    function guardarMensaje(string memory _mensaje) public {
        require(ultimoPost[msg.sender] < block.timestamp - 5 minutes, "El usuario ya posteo en los ultimos 5 minutos.");

        ultimaVisita.mensaje = _mensaje;
        ultimaVisita.autor = msg.sender;

        ultimoPost[msg.sender] = block.timestamp;
    }

    function verMensaje() public view returns(uint,string memory, address) {
        return (ultimoPost[msg.sender], ultimaVisita.mensaje, ultimaVisita.autor);
    }

    function verBalanceContrato() public  returns(uint){
        return address(this).balance;
    } 

    function donar() public payable{
        require(msg.value>0,"Hay que mandar saldo mayor a 0");

    }

    receive() external payable { //receive es para trx sin parametros
        require(msg.value>0,"Hay que mandar saldo mayor a 0");
    }

}
