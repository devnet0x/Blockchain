const { expect } = require("chai");

describe("Elevator contract", function () {
  it("Setea el piso top", async function () {
    [owner] = await ethers.getSigners();
    const Contrato = await ethers.getContractFactory("ResElevator");
    const toa='0x361e1AFD1fCA3D79Cef20DBd53f860aCAc83411e' //direccion contrato atacante deployado
    const contrato = await Contrato.attach(toa);
    await contrato.setFloor(1);

    //Para comprobar que esta resuelto, ir a ethernaut console y ejecutar:
    //await contract.floor().then(v => v.toString())
    //"1"
    //await contract.top().then(v => v.toString())
    //"true"
  });
});