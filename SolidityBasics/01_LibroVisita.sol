// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/*libro de visitas
direccion del que firma(account)
mensaje
fecha

se agregar ultimPost para evitar post en menos de 5 minutos
*/
contract libroVisitas{
    struct Visita {
        address autor;
        string texto;
    }
    
    Visita _ultimaVisita;
    mapping (address => uint256) _ultimoPost;

    function agregar(string memory texto) public{
        require(_ultimoPost[msg.sender] < block.timestamp - 5 minutes,"Se deben esperar 5 minutos antes de enviar un nuevo post");
        _ultimaVisita.autor=msg.sender;
        _ultimaVisita.texto=texto;
        _ultimoPost[msg.sender]=block.timestamp;
    }

    function leer() public view returns (address,string memory,uint256){
        return(_ultimaVisita.autor,_ultimaVisita.texto,_ultimoPost[msg.sender]);
    }
}
