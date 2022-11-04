import { assert } from "chai";
import { ethers } from "hardhat";

describe("Executing", function () {
  it("Solo hay que llmaar", async function () {

    // Attach to contracts
    const toa='0x07278f6c268DA00f1b39baA215c843C8202C95F0' //direccion contrato capturethe
    const ethernautContract = await (await ethers.getContractFactory("CallMeChallenge")).attach(toa);

    //const toa2='0xd83A31Ad660417c3E83992065567432CC3B66E09'; //direccion contrato instancia ethernaut
    
    //Llamamos al contrato exploit que implementa price del contrato shop de ethernaut
    await ethernautContract.callme(); 
  });
});