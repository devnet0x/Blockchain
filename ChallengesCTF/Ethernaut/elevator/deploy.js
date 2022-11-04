async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const JPContrato = await ethers.getContractFactory("ResElevator");
    const jpcontrato = await JPContrato.deploy('0x18672b5699035DbFa0512b78637B11C55C8d93f6');//direccion instancia ethernaut
    await jpcontrato.deployed();
    console.log("Token address:", jpcontrato.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });