import { assert } from "chai";
import { ethers } from "hardhat";
import { utils } from "mocha";

describe("Executing", function () {
  it("Solo hay que llmaar", async function () {

    // Attach to contracts
    const toa='0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee' //direccion contrato capturethe
    const ethernautContract = await (await ethers.getContractFactory("CaptureTheEther")).attach(toa);

    //const toa2='0xd83A31Ad660417c3E83992065567432CC3B66E09'; //direccion contrato instancia ethernaut
    
    //Llamamos al contrato exploit que implementa price del contrato shop de ethernaut
    const miNick=ethers.utils.formatBytes32String("Dplox");
    await ethernautContract.setNickname(miNick); 
  });
});