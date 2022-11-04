import { ethers, run } from "hardhat";

const sleep = (timeToSleepInSecs: number) => new Promise((resolve) => {
  setTimeout(resolve, timeToSleepInSecs * 1000);
})

async function main() {
  // Deploy contract
  const toa="0x9a30F736df9E783FF2c8C68ce6B0c47B463b9F9C"; //Contrato chlalenge capturetheether
  const hackGatekeeperContract = await (await ethers.getContractFactory("TokenWhaleChallenge")).deploy(toa);
  await hackGatekeeperContract.deployed();
  console.log("Contract deployed!")

  // Verify contract
  console.log("Sleeping for 10 segs...");
  await sleep(10);
  /*await run("verify:verify", {
    address: hackGatekeeperContract.address,
    constructorArguments: [],
  });*/

  // Print address
  console.log(`[>] Deployed at: ${hackGatekeeperContract.address}`);
  console.log(`[>] Etherscan (rinkeby): https://rinkeby.etherscan.io/address/${hackGatekeeperContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});