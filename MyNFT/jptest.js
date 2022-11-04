const { expect } = require("chai");

describe("NFT contract", function () {
  it("Deploy debe mintear un token", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("JPNFT");

    //const hardhatNFT = await Token.deploy();
    const hardhatNFT = await Token.attach('0xfD4C76DB048937E192a6b0C9E5541A6CE6f16fdB');

    const toAddress = "0x9A54200505907852a27307f14d31Afc0875c99Ac";
    await hardhatNFT.safeMint(toAddress);
    console.log(await hardhatNFT.tokenURI(1));
  });
});
