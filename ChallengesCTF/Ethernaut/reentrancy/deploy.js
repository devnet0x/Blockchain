async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const JPContrato = await ethers.getContractFactory("Reenter");
    const initialBalance = ethers.utils.parseEther("0.0001");
    const jpcontrato = await JPContrato.deploy({ value: initialBalance });
    await jpcontrato.deployed();
    console.log("Token address:", jpcontrato.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });