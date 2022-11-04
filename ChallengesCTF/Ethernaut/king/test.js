const { expect } = require("chai");

describe("FORCE contract", function () {
  it("Transfiere ether por autodestruccion", async function () {
    [owner] = await ethers.getSigners();
    const Contrato = await ethers.getContractFactory("Rey");
    const toa='0x7a5A8527b4C2F66c32Aac11647997cbAAF9c3Cb4'
    const contrato = await Contrato.attach(toa);

    const params = { value: ethers.utils.parseUnits("0.002", "ether").toHexString(),
                    gasLimit: ethers.utils.parseUnits("4000000", "wei").toHexString(),
                    maxPriorityFeePerGas: ethers.utils.parseUnits("3", "gwei").toHexString(),
                  };
    const contratoRey='0xB8c7eEC0aaeC36aE4a905060214945Aef7af67Bd';
    await contrato.HaceRey(contratoRey,params);
  });
});