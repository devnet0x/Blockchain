async function main() {
  const [player,deployer] = await ethers.getSigners();

  console.log("\nDeploying Contract1 with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const Contrato1 = await ethers.getContractFactory("InSecureumToken");
  const contrato1 = await Contrato1.connect(deployer).deploy(ethers.utils.parseEther("10")); //Upon deployment, the InSecureumToken contract mints an initial supply of 10 $ISEC to the contract deployer.
  await contrato1.deployed();
  console.log("Contract address:", contrato1.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  console.log("\nDeploying Contract2 with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const Contrato2 = await ethers.getContractFactory("InSecureumLenderPool");
  const contrato2 = await Contrato2.connect(deployer).deploy(contrato1.address);
  await contrato2.deployed();
  console.log("Contract address:", contrato2.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  
  //The InSecureumLenderPool contract operates with $ISEC.  
  //The contract deployer transfers all of their $ISEC to the InSecureumLenderPool contract.
  console.log("Account Token balance:", (await contrato1.balanceOf(deployer.address)).toString());
  console.log("Account Token balance:", (await contrato1.balanceOf(contrato2.address)).toString());
  await contrato1.transfer(contrato2.address,ethers.utils.parseEther("10"))
  console.log("Account Token balance:", (await contrato1.balanceOf(deployer.address)).toString());
  console.log("Account Token balance:", (await contrato1.balanceOf(contrato2.address)).toString());
  
  console.log("\nDeploying ATTACK with the account:", player.address);
  console.log("Account balance:", (await player.getBalance()).toString());
  const Attack = await ethers.getContractFactory("Attack");
  const attack = await Attack.connect(player).deploy();
  await attack.deployed();
  console.log("Contract address:", attack.address);
  console.log("Account balance:", (await player.getBalance()).toString());
  
  console.log("\r");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });