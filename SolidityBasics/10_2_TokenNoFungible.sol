// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MonosNFT is ERC721("Monos","MFT"){
    using Counters for Counters.Counter;
    Counters.Counter private _tokenID;
    mapping (address=>uint) public deposito;
        
    receive() external payable{
        deposito[msg.sender]+=msg.value;
        if (deposito[msg.sender]>=10){
            _mint(msg.sender,_tokenID.current());
            _tokenID.increment();
            deposito[msg.sender]=0;
        }
    }
}

//Depositar a contrato
//Cuando se alcanze 1 ether entonces mint y comenzar de cero
//Para el ejemplo, es resposabilidad del usuario depositar justo 1 ether.
//Si se pasa entonces pierde el usuario
