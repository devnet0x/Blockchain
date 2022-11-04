import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { utils } from "mocha";

const EthUtil=require('ethereumjs-util');
const EthTx = require('ethereumjs-tx').Transaction


const sleep = (timeToSleepInSecs: number) => new Promise((resolve) => {
  setTimeout(resolve, timeToSleepInSecs * 1000);
})

describe("Executing", function () {
  it("Solo hay que llamar al exploit", async function () {
    const hre = require("hardhat");
    const accounts = await hre.ethers.getSigners();
    // Obtener raw desde etherscan
    const rawText="0xf88939850c11e31edb8301d4c0945e4e68eca47532c4f3337cf4a5ace8e2210caa9880a42e1a7d4d00000000000000000000000000000000000000000000000000000000000000002ea0e14ac11452ec9e80643cfd7175a1ae0484b7ef159f6a59c3d0ccf84b05b124d7a03d489e11dc756df5871fca6b7620068064d6367bffba68b1da4d4672ea72632d";
    // Create a tx object from signed tx 
    const tx = new EthTx(rawText,{chain:'goerli'});
    // Get an address of sender
    console.log(tx);
    const address = EthUtil.bufferToHex(tx.getSenderAddress());
    // get a public key of sender
    const publicKey = EthUtil.bufferToHex(tx.getSenderPublicKey());
    console.log(address);
    console.log(publicKey);
    });
});

