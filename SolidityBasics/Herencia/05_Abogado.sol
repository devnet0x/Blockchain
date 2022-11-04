// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./004_Persona.sol";
contract Abogado is Persona{
    function verProfesion() public pure override returns (string memory){
        return("Abogado");
    }
};
