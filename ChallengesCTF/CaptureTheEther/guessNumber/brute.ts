import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { utils } from "mocha";

describe("Executing", function () {
  it("Solo hay que llmaar", async function () {

    // Attach to contracts
    const toa='0x66cf47dE1A1f8a3872Af2Bd661e77a21e68D4C7F' //direccion contrato capturethe
    const ethernautContract = await (await ethers.getContractFactory("GuessTheNumberChallenge")).attach(toa);

    //const toa2='0xd83A31Ad660417c3E83992065567432CC3B66E09'; //direccion contrato instancia ethernaut
    
    //Llamamos al contrato exploit que implementa price del contrato shop de ethernaut
    //const miNick=ethers.utils.formatBytes32String("Dplox");
    await ethernautContract.guess(42,{value: ethers.utils.parseEther("1.0")});
    expect(await ethernautContract.isComplete());
  });
});