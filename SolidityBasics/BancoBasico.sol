// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Banco{
    mapping (address => uint256) balances;

    receive() external payable { //receive es para trx sin parametros
        revert("Se requiere un destino para depositar");
    }

    fallback() external payable { //receive es para trx sin parametros
        revert("Se requiere un destino para depositar");
    }

    function depositar() external payable { //receive es para trx sin parametros
        //require(msg.value>=monto,"Saldo insuficiente para pagar el GAS");
        require(msg.value>0,"Hay que depositar un saldo mayor a 0");
        balances[msg.sender]+=msg.value; //Que pasa si el value es > el monto, se devuelve la plata?
    }

    function retiro(uint monto) external payable {
        require(balances[msg.sender]>=monto,"Saldo insuficiente"); //si saldo es cero igual hace trx por cero
        balances[msg.sender]-=monto;
        payable(msg.sender).transfer(monto); //2300 limite fijo unidades de gas;
    }

    function consultar(address cuenta) external view returns(uint){
        if (cuenta==(address(0)))
            return (balances[msg.sender]);
        else
            return(balances[cuenta]);
    }

    function verBalanceContrato(address cuenta) public view returns(uint){
        return address(cuenta).balance;
    } 

    function transferir(address destino,uint monto) external payable {
        require(balances[msg.sender]>=monto,"Saldo insuficiente para transferir");
        balances[msg.sender]-=monto;
        balances[destino]+=monto;
    }
    //cada usuario puede depositar
    //hacer retiro tb
    //consultarlo
    //dejar transferir a otro usuario

    //agregar un receive para que no reciba si no hay una cuenta
}
