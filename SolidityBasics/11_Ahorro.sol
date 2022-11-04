// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./11_1_nft.sol";

contract Ahorro {
    mapping (address=>uint) public deposito;
    address owner;
    TokenNoFungible nft;

    constructor(){
        owner=msg.sender;
        nft=new TokenNoFungible();
    }
        
    receive() external payable{
        deposito[msg.sender]+=msg.value;
        if (deposito[msg.sender]>=10){
            nft.EmitirNFT(msg.sender);
                        
            deposito[msg.sender]-=1;
            deposito[owner]+=1;
        }
    }

    function retirarFondos() public{
        uint balanceUsuario=deposito[msg.sender];
        deposito[msg.sender]=0;
        payable(msg.sender).transfer(balanceUsuario);
    }
}

//Depositar a contrato
//Cuando se alcanze 1 ether entonces mint y comenzar de cero
//Para el ejemplo, es resposabilidad del usuario depositar justo 1 ether.
//Si se pasa entonces pierde el usuario
