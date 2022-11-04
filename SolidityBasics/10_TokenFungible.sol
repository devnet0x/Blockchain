// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenFungible is ERC20("Token Fungible","TF"){

    //no es necesario, se usa clase ERC20
    //mapping (address=>uint) public balance;

    constructor(){
        _mint(msg.sender,1000);
    }

    receive() external payable{
        //balance[msg.sender]+=msg.value;
        _mint(msg.sender,msg.value);
    }

    /*fallback() external payable{
        balance[msg.sender]+=msg.value;
    }*/

    /*function retirarEther(uint cantidad) external payable{
        require(balance[msg.sender]>=cantidad,"Saldo Insuficiente");
        balance[msg.sender]-=msg.value;
        transfer(msg.sender,cantidad);
    }*/
    function transfer(address to, uint256 amount) public virtual override returns(bool){
        bool resultado=super.transfer(to,amount);

        if(resultado && to==address(this)){
            resultado=payable(msg.sender).send(amount);
            _burn(to,amount);
        }

        return resultado;
    }

    /*function consultar() external view returns(uint){
        return(balance[msg.sender]);
    }*/
}

//token erc20 por cada ether recibido emite tokens
//si transfiere token al contrato, debe devolver ethers
