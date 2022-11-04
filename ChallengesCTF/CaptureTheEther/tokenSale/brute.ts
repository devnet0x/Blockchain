import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { utils } from "mocha";

describe("Executing", function () {
  it("Solo hay que llamar al exploit", async function () {

    // Attach to contracts
    const toa2="0x43adac3E0CBE6bFc70FB9F9A90bdC4e1b73FDb42";
    const challengeContract = await (await ethers.getContractFactory("TokenSaleChallenge")).attach(toa2);
    
    //Solo hay que hacer un integer overflow:
    //await challengeContract.buy(115792089237316195423570985008687907853269984665640564039458n,{value: "415992086870360064"}); 
    //await challengeContract.sell(1); 
    //Validar
    expect(await challengeContract.isComplete()).to.be.true;
  });
});