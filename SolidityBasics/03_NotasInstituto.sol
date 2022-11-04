// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/*gestionar notas de alumno
cargar notas de alumno
consultar promedio del alumno (address)*/

import "./2_Owner.sol";

contract Instituto is Owner{
    mapping (address => uint256[]) notas;

    function agregarNota(address alumno,uint256 nota) public{
        notas[alumno].push(nota);
    }

    function verPromedio(address alumno) public view returns(uint8){
        require(notas[alumno].length>0,"Alumno no tiene notas");
        uint256 suma=0;
        for (uint8 i;i<notas[alumno].length;i++){
            suma+=notas[alumno][i];
        }
        return uint8(suma/notas[alumno].length);
    }

}
