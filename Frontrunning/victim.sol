//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

//emulate a car buy/sale contract
contract exampleHack1{ 
    address public s_owner;
    string public s_registration;
    uint256 public s_price;
    address DAI_ADDRESS=0x6b175473e89094cc4da98b954eedeAC495271d0F; //Contrato dai en mainnet
    uint256 s_blocNum; //Mitigation: Require that can't buy and sale in the same block

    constructor(string memory p_registration){
        s_owner=msg.sender;
        s_registration=p_registration;
    }

    function setPrice(uint256 p_price) public{
        require(msg.sender==s_owner,"Not owner");
        require(s_blocNum<block.number,"Error frontrunning detection");//Mitigation: Require that can't buy and sale in the same block
        s_price=p_price;
    }

    function buy(address p_newOwner) public{
        require(s_price>0,"Not for sale");
        require(IERC20(DAI_ADDRESS).balanceOf(msg.sender)>=s_price,"Insufficient funds");
        require(IERC20(DAI_ADDRESS).allowance(msg.sender,address(this))>=s_price,"Insufficient funds");
        IERC20(DAI_ADDRESS).transferFrom(msg.sender,s_owner,s_price);

        s_owner=p_newOwner;
        delete s_price;

        s_blocNum=block.number;//Mitigation: Require that can't buy and sale in the same block
    }
}
