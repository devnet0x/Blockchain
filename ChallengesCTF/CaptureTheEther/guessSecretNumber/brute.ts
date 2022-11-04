import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { utils } from "mocha";

describe("Executing", function () {
  it("Solo hay que llmaar", async function () {

    var answerHash = '0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365';
    for(var i=0; i<2000; i++) {
      if(ethers.utils.keccak256(ethers.utils.hexlify(i)) == answerHash) {
        console.log('Answer Found: ' + i);
        break;
      }
    }

    // Attach to contracts
    const toa='0xaaB800959960B2D55cFa2CD75e868dF76033eF90' //direccion contrato capturethe
    const ethernautContract = await (await ethers.getContractFactory("GuessTheSecretNumberChallenge")).attach(toa);

    //const toa2='0xd83A31Ad660417c3E83992065567432CC3B66E09'; //direccion contrato instancia ethernaut
    
    //Llamamos al contrato exploit que implementa price del contrato shop de ethernaut
    //const miNick=ethers.utils.formatBytes32String("Dplox");
    await ethernautContract.guess(i,{value: ethers.utils.parseEther("1.0")});
    expect(await ethernautContract.isComplete());
  });
});