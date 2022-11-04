async function main() {
  const [player,deployer] = await ethers.getSigners();

  //Upon deployment, the InSecureumToken and BoringToken contracts mint an 
  //initial supply of 30000 $ISEC and 20000 $BOR to the contract deployer.
  console.log("\nDeploying Token ISEC with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const Contrato1 = await ethers.getContractFactory("InSecureumToken");
  const contrato1 = await Contrato1.connect(deployer).deploy(ethers.utils.parseEther("30000")); 
  await contrato1.deployed();
  console.log("Contract address:", contrato1.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  console.log("\nDeploying Token BOR with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const Contrato2 = await ethers.getContractFactory("BoringToken");
  const contrato2 = await Contrato2.connect(deployer).deploy(ethers.utils.parseEther("20000"));
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

  //The deployer adds an initial liquidity of 100 $ISEC and 100 $BOR to the InsecureDexLP.
  var tx=await contrato1.connect(deployer).approve(contrato3.address,ethers.constants.MaxUint256);
  await ethers.provider.waitForTransaction(tx.hash);
  tx=await contrato2.connect(deployer).approve(contrato3.address,ethers.constants.MaxUint256);
  await ethers.provider.waitForTransaction(tx.hash);
  tx=await contrato3.connect(deployer).addLiquidity(ethers.utils.parseEther("100"),ethers.utils.parseEther("100"));
  await ethers.provider.waitForTransaction(tx.hash);

  //Similarly, InSecureumLenderPool contract is funded with 10000 $ISEC by the deployer.  
  console.log("\nDeploying LENDERPOOL with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const Contrato4 = await ethers.getContractFactory("InSecureumLenderPool");
  const contrato4 = await Contrato4.connect(deployer).deploy(contrato1.address);
  await contrato4.deployed();
  console.log("Contract address:", contrato4.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  tx=await contrato1.connect(deployer).transfer(contrato4.address,ethers.utils.parseEther("10000"));
  await ethers.provider.waitForTransaction(tx.hash);

  //BorrowSystemInsecureOracle uses the InsecureDexLP to compute the $ISEC/$BOR price.
  //The BorrowSystemInsecureOracle contract has an initial amount of 10000 $ISEC and 10000 $BOR provided by the deployer.
  console.log("\nDeploying BORROWSYSTEM with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const Contrato5 = await ethers.getContractFactory("BorrowSystemInsecureOracle");
  const contrato5 = await Contrato5.connect(deployer).deploy(contrato3.address,contrato1.address,contrato2.address);
  await contrato5.deployed();
  console.log("Contract address:", contrato5.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  tx=await contrato1.connect(deployer).transfer(contrato5.address,ethers.utils.parseEther("10000"));
  await ethers.provider.waitForTransaction(tx.hash);
  tx=await contrato2.connect(deployer).transfer(contrato5.address,ethers.utils.parseEther("10000"));
  await ethers.provider.waitForTransaction(tx.hash);
  
  console.log("\nDeploying ATTACK with the account:", player.address);
  console.log("Account balance:", (await player.getBalance()).toString());
  const Attack = await ethers.getContractFactory("Attack");
  const attack = await Attack.connect(player).deploy();
  await attack.deployed();
  console.log("Contract address:", attack.address);
  console.log("Account balance:", (await player.getBalance()).toString());
  

  console.log("\nToken balance after challenge setup:");
  console.log("Deployer   Token1 balance:", ethers.utils.formatEther(await contrato1.balanceOf(deployer.address)));
  console.log("Player     Token1 balance:", ethers.utils.formatEther(await contrato1.balanceOf(player.address)));
  console.log("Dex        Token1 balance:", ethers.utils.formatEther(await contrato1.balanceOf(contrato3.address)));
  console.log("LenderPool Token1 balance:", ethers.utils.formatEther(await contrato1.balanceOf(contrato4.address)));
  console.log("Borrower   Token1 balance:", ethers.utils.formatEther(await contrato1.balanceOf(contrato5.address)));
  console.log("Attacker   Token1 balance:", ethers.utils.formatEther(await contrato1.balanceOf(attack.address)));
  
  console.log("\nDeployer   Token2 balance:", ethers.utils.formatEther(await contrato2.balanceOf(deployer.address)));
  console.log("Player     Token2 balance:", ethers.utils.formatEther(await contrato2.balanceOf(player.address)));
  console.log("Dex        Token2 balance:", ethers.utils.formatEther(await contrato2.balanceOf(contrato3.address)));
  console.log("LenderPool Token2 balance:", ethers.utils.formatEther(await contrato2.balanceOf(contrato4.address)));
  console.log("Borrower   Token2 balance:", ethers.utils.formatEther(await contrato2.balanceOf(contrato5.address)));
  console.log("Attacker   Token2 balance:", ethers.utils.formatEther(await contrato2.balanceOf(attack.address)));

  console.log("\r");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });