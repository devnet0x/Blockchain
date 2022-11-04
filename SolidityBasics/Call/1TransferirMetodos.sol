// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Transferir {
    function transferirPorCall(address direccion, uint monto) external{
        // es preferible este metodo porque permite modificar el gas limit
        //gas limit:mientras mas ponga mas se puede hacer en el receive o en el fallback 
        (bool funciono,)=direccion.call{value:monto,gas:2300}(""); 
        require(funciono);
    }

    function transferirPorSend(address direccion, uint monto) external{
        (bool funciono,)=payable(direccion).send(monto);//2300 limite fijo unidades de gas
        require(funciono);
    }

    function transferirPorCall(address direccion, uint monto) external{
        payable(direccion).transfer(monto); //2300 limite fijo unidades de gas;
    }

}
