async function main() {
  const [player,deployer] = await ethers.getSigners();

  console.log("\nDeploying Token ISEC with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const Contrato1 = await ethers.getContractFactory("InSecureumToken");
  const contrato1 = await Contrato1.connect(deployer).deploy(ethers.utils.parseEther("10")); //Upon deployment, the InSecureumToken contract mints an initial supply of 10 $ISEC to the contract deployer.
  await contrato1.deployed();
  console.log("Contract address:", contrato1.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  console.log("\nDeploying Token SET with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const Contrato2 = await ethers.getContractFactory("SimpleERC223Token");
  const contrato2 = await Contrato2.connect(deployer).deploy(ethers.utils.parseEther("10"));
  await contrato2.deployed();
  console.log("Contract address:", contrato2.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  console.log("\nDeploying DEX with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const Contrato3 = await ethers.getContractFactory("InsecureDexLP");
  const contrato3 = await Contrato3.connect(deployer).deploy(contrato1.address,contrato2.address);
  await contrato3.deployed();
  console.log("Contract address:", contrato3.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  console.log("Token balance after deploy:");
  console.log("Deployer Token1 balance:", (await contrato1.balanceOf(deployer.address)).toString());
  console.log("Dex      Token1 balance:", (await contrato1.balanceOf(contrato3.address)).toString());
  console.log("Player   Token1 balance:", (await contrato1.balanceOf(player.address)).toString());
  console.log("Deployer Token2 balance:", (await contrato2.balanceOf(deployer.address)).toString());
  console.log("Dex      Token2 balance:", (await contrato2.balanceOf(contrato3.address)).toString());
  console.log("Player   Token2 balance:", (await contrato2.balanceOf(player.address)).toString());

  //Agregar liquidez al pool
  const tx1=await contrato1.connect(deployer).approve(contrato3.address,ethers.constants.MaxUint256);
  await ethers.provider.waitForTransaction(tx1.hash);
  const tx2=await contrato2.connect(deployer).approve(contrato3.address,ethers.constants.MaxUint256);
  await ethers.provider.waitForTransaction(tx2.hash);
  const tx3=await contrato3.connect(deployer).addLiquidity(ethers.utils.parseEther("9"),ethers.utils.parseEther("9"));
  await ethers.provider.waitForTransaction(tx3.hash);
  
  console.log("\nDeploying ATTACK with the account:", player.address);
  console.log("Account balance:", (await player.getBalance()).toString());
  const Attack = await ethers.getContractFactory("Attack");
  const attack = await Attack.connect(player).deploy();
  await attack.deployed();
  console.log("Contract address:", attack.address);
  console.log("Account balance:", (await player.getBalance()).toString());
  
  //Transfiere 1 a Attacker y deployer queda con 9
  const tx4=await contrato1.connect(deployer).transfer(attack.address,ethers.utils.parseEther("1"));
  await ethers.provider.waitForTransaction(tx4.hash);
  const tx5=await contrato2.connect(deployer).transfer(attack.address,ethers.utils.parseEther("1"));
  await ethers.provider.waitForTransaction(tx5.hash);

  console.log("\nToken balance after challenge setup:");
  console.log("Deployer Token1 balance:", (await contrato1.balanceOf(deployer.address)).toString());
  console.log("Dex      Token1 balance:", (await contrato1.balanceOf(contrato3.address)).toString());
  console.log("Player   Token1 balance:", (await contrato1.balanceOf(player.address)).toString());
  console.log("Attacker Token1 balance:", (await contrato1.balanceOf(attack.address)).toString());
  console.log("Deployer Token2 balance:", (await contrato2.balanceOf(deployer.address)).toString());
  console.log("Dex      Token2 balance:", (await contrato2.balanceOf(contrato3.address)).toString());
  console.log("Player   Token2 balance:", (await contrato2.balanceOf(player.address)).toString());
  console.log("Attacker Token2 balance:", (await contrato2.balanceOf(attack.address)).toString());
  
  console.log("\r");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });