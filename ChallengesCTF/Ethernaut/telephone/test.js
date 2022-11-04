const { expect } = require("chai");

describe("TELEPHONE contract", function () {
  it("Cambia owner", async function () {
    //const [owner] = await ethers.getSigners();

    const Contrato = await ethers.getContractFactory("caller");

    const contrato = await Contrato.attach('0xbA1A1818f9EdD6AcdE0aaF62Bfc3BC3a5AAaC2B6');

    const newOwner = "0x9A54200505907852a27307f14d31Afc0875c99Ac";
    await contrato.cambiaOwner(newOwner);
    //console.log(await hardhatNFT.tokenURI(1));
  });
});