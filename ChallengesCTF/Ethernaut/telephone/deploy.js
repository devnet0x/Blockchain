async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const JPToken = await ethers.getContractFactory("caller");
    const jptoken = await JPToken.deploy("0xb79849a0dccf7326d5276F3D5DDB554a4e918eFa");
    await jptoken.deployed();
    console.log("Token address:", jptoken.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });