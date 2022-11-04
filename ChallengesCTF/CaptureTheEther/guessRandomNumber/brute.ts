import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { utils } from "mocha";

describe("Executing", function () {
  it("Solo hay que llamar al exploit", async function () {

    // Attach to contracts
    const toa='0xAfE7B6AfC46aE172267b1f28e256cCb9Ee6Eb2bc' //direccion contrato exploit
    const exploitContract = await (await ethers.getContractFactory("calcSecret")).attach(toa);

    const toa2='0x88ddB2721206D7Cce772A27e544aECe15aE4E7a1' //direccion contrato capturethe
    const ethernautContract = await (await ethers.getContractFactory("GuessTheRandomNumberChallenge")).attach(toa2);

    //Llamamos al contrato exploit que calcula el numero
    const i=await exploitContract.find();
    console.log('Numero=',i);
    await ethernautContract.guess(i,{value: ethers.utils.parseEther("1.0")});
    
    expect(await ethernautContract.isComplete());
  });
});