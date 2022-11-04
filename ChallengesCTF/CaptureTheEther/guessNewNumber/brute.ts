import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { utils } from "mocha";

describe("Executing", function () {
  it("Solo hay que llamar al exploit", async function () {

    // Attach to contracts
    const toa='0x1d3A64106d6717BecEE32cFa3E91750C33dC15BB' //direccion contrato exploit
    const exploitContract = await (await ethers.getContractFactory("GuessTheNewNumberSolver")).attach(toa);

    const toa2='0x1037e7715b438BFA8D224A804e4ae49a7cE23275' //direccion contrato capturethe
    const ethernautContract = await (await ethers.getContractFactory("GuessTheNewNumberChallenge")).attach(toa2);

    //Llamamos al contrato exploit que calcula el numero
    await exploitContract.solve(toa2,{value: ethers.utils.parseEther("1.0")});
    
    expect(await ethernautContract.isComplete());
  });
});