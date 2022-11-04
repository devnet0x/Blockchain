const { expect } = require("chai");

describe("Reentrancy contract", function () {
  it("Dona y quita", async function () {
    [owner] = await ethers.getSigners();
    const Contrato = await ethers.getContractFactory("Reenter");
    const toa='0xc15D4d80c55643a8fcFB8Ba82f3e06b722eFe804'
    const contrato = await Contrato.attach(toa);
    await contrato.donar();

    //Para terminar, transferir ether desde metamask a este contrato
    //para que ejecute el fallback y haga los withdrawal.
  });
});