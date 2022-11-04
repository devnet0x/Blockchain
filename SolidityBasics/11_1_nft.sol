// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TokenNoFungible is ERC721("Monos","MFT"){
    address owner;
    uint ultimoIdGenerado;

    constructor(){
        owner=msg.sender;
    }
    
    function EmitirNFT(address direccion) public {
        require(msg.sender==owner,"Usuario no es owner");
        _safeMint(direccion,++ultimoIdGenerado); //_safeMint hace mas chequeos que _mint
    }
}