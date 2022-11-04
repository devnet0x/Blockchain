import { ethers, run } from "hardhat";

const sleep = (timeToSleepInSecs: number) => new Promise((resolve) => {
  setTimeout(resolve, timeToSleepInSecs * 1000);
})

async function main() {
  // Deploy contract
  //const toa2="0x9A54200505907852a27307f14d31Afc0875c99Ac"; //Owner del contrato para factory capturethether (cuenta 0)
  var acct0,acct1;
  [acct0, acct1] = await ethers.getSigners();
  const hackGatekeeperContract = await (await ethers.getContractFactory("DonationChallenge")).connect(acct1).deploy({value: ethers.utils.parseEther("1")});
  // DEployed at: 0x5FbDB2315678afecb367f032d93F642f64180aa3
  await hackGatekeeperContract.deployed();
  console.log("Contract deployed!")

  // Verify contract
  //console.log("Sleeping for 10 segs...");
  //await sleep(10);
  /*await run("verify:verify", {
    address: hackGatekeeperContract.address,
    constructorArguments: [],
  });*/

  // Print address
  console.log(`[>] Deployed at: ${hackGatekeeperContract.address}`);
  //console.log(`[>] Etherscan (rinkeby): https://rinkeby.etherscan.io/address/${hackGatekeeperContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});