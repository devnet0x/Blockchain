const { expect } = require("chai");
const { experimentalAddHardhatNetworkMessageTraceHook } = require("hardhat/config");

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("JPTOKEN");

    const hardhatToken = await Token.deploy();
    await hardhatToken.deployed();
    console.log(hardhatToken.address);
    console.log(await hardhatToken.owner());
    console.log(owner.address);
    //console.log(addr1.address);

    const toAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    console.log(ownerBalance);
    const addr1Balance = await hardhatToken.balanceOf(toAddress);
    console.log(addr1Balance);
    //0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
    await hardhatToken.transfer(toAddress, ethers.utils.parseEther("100000.0"));  
    //const toAddress = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
    //const amount = 1;
    //await hardhatToken.transfer(toAddress, amount);
    const ownerBalance1 = await hardhatToken.balanceOf(owner.address);
    console.log(ownerBalance1);
    const addr1Balance1 = await hardhatToken.balanceOf(toAddress);
    console.log(addr1Balance1);
});
});
