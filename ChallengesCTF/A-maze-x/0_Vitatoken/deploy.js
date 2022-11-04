async function main() {
  const [player,deployer2] = await ethers.getSigners();

  console.log("\nDeploying Contract1 with the account:", deployer2.address);
  console.log("Account balance:", (await deployer2.getBalance()).toString());
  const Contrato1 = await ethers.getContractFactory("VToken");
  const contrato1 = await Contrato1.connect(deployer2).deploy();
  await contrato1.deployed();
  console.log("Contract address:", contrato1.address);
  console.log("Account balance:", (await deployer2.getBalance()).toString());

  console.log("\nDeploying ATTACK with the account:", player.address);
  console.log("Account balance:", (await player.getBalance()).toString());
  const JPContrato = await ethers.getContractFactory("attack");
  const jpcontrato = await JPContrato.connect(player).deploy();
  await jpcontrato.deployed();
  console.log("Contract address:", jpcontrato.address);
  console.log("Account balance:", (await player.getBalance()).toString());
  console.log("\r");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });