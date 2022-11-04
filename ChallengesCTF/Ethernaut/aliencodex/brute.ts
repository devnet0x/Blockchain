import { assert } from "chai";
import { ethers } from "hardhat";

describe("Executing", function () {
  it("PreservationAttacker debe tomar ownership", async function () {

    // Deploy contracts
    //const gatekeeperContract = await (await ethers.getContractFactory("GatekeeperOne")).deploy();
    //const hackGatekeeperContract = await (await ethers.getContractFactory("HackGatekeeperOne")).deploy();
    //await Promise.all([gatekeeperContract, hackGatekeeperContract].map((contract) => contract.deployed()));

    // Attach to contracts
    const toa='0x32151A4a5C9739a000363ee1E965CF8f4FB656E6' //direccion contrato exploit deployado
    const ethernautContract = await (await ethers.getContractFactory("AlienHack")).attach(toa);
    
    //Primero cambiamos la direccion del contrato invocado
    await ethernautContract.exploit();
  });
});