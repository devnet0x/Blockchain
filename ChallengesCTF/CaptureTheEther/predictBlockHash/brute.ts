import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { utils } from "mocha";

describe("Executing", function () {
  it("Solo hay que llamar al exploit", async function () {

    // Attach to contracts
    const toa2="0x3F1e32dD8D3C19d9d28b995641C418A70D63e21C";
    const challengeContract = await (await ethers.getContractFactory("PredictTheBlockHashChallenge")).attach(toa2);
    
    //Llamar uno por uno:

    //1:Deploy the contract, send 1 ether with the constructor.
    //2:Call lockInGuess() with a value of 0x0000000000000000000000000000000000000000000000000000000000000000 and send another ether.
    //await challengeContract.lockInGuess(ethers.utils.formatBytes32String(""),{value: ethers.utils.parseEther("1.0")}); 
    //3:Wait for approximately 1 hour or check what the previous step’s block was and wait until 256 more blocks have been mined. You can of course check this on etherscan.
    //4:Call settle().
    //await challengeContract.settle();
    //5:Validar
    expect(await challengeContract.isComplete()).to.be.true;
  });
});