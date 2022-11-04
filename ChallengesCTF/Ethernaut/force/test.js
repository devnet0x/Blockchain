const { expect } = require("chai");

describe("FORCE contract", function () {
  it("Transfiere ether por autodestruccion", async function () {
    [owner] = await ethers.getSigners();
    const Contrato = await ethers.getContractFactory("ContratoAutoDest");
    const toa='0x9f79A8fA5d4e6E3E6E64bF587F37557EA06E52F7'
    const contrato = await Contrato.attach(toa);
/*  ENVIAR DINERO a CONTRATO
    const params = { to: toa, 
                    value: ethers.utils.parseUnits("1", "wei").toHexString(),
                    gasLimit: ethers.utils.parseUnits("310000", "wei").toHexString()
                  };
    const txHash = await owner.sendTransaction(params);
    console.log("transactionHash is " + txHash);   */

    //Llamar a autodestruir
    await contrato.autoDestruir();
  });
});