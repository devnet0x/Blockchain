import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { utils } from "mocha";

const EthUtil=require('ethereumjs-util');
const EthTx = require('ethereumjs-tx').Transaction


const sleep = (timeToSleepInSecs: number) => new Promise((resolve) => {
  setTimeout(resolve, timeToSleepInSecs * 1000);
})

describe("Executing", function () {
  it("Solo hay que llamar al exploit", async function () {
    const hre = require("hardhat");
    const accounts = await hre.ethers.getSigners();
    // 1° Obtener raw de las dos primeras trx desde etherscan con:
    // https://api--ropsten-etherscan-io.translate.goog/api?module=account&action=txlist&address=0x6B477781b0e68031109f21887e6B5afEAaEB002b&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=NBV1N4K1Z1JIIN766SEZ78P619FK43ZA74&_x_tr_sl=auto&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=wapp
    // luego con el hash obtener el raw tx hex desde etherscan 
    const rawText="0xf86b80843b9aca008252089492b28647ae1f3264661f72fb2eb9625a89d88a31881111d67bb1bb00008029a069a726edfb4b802cbf267d5fd1dabcea39d3d7b4bf62b9eeaeba387606167166a07724cedeb923f374bef4e05c97426a918123cc4fec7b07903839f12517e1b3c8";
    const tx = new EthTx(rawText,{chain:'ropsten'});
    console.log(`TX 1`, JSON.stringify(tx, null, 4));
    //2° Obtener paramtros r,s y z y observar que se repite el r que deberia ser aleatorio
    // lo anterior porque algunos disposiitos moviles tenian un bug que generaba el mismo r
    // para distintas transacciones.
    console.log("r1:",EthUtil.bufferToHex(tx.r));
    console.log("s1:",EthUtil.bufferToHex(tx.s));
    console.log("v1:",EthUtil.bufferToHex(tx.v));
    const z1=tx.hash(false).toString("hex");
    console.log("z1=",z1);
    
    const rawText1="0xf86b01843b9aca008252089492b28647ae1f3264661f72fb2eb9625a89d88a31881922e95bca330e008029a069a726edfb4b802cbf267d5fd1dabcea39d3d7b4bf62b9eeaeba387606167166a02bbd9c2a6285c2b43e728b17bda36a81653dd5f4612a2e0aefdb48043c5108de";
    const tx1 = new EthTx(rawText1,{chain:'ropsten'});
    console.log(`TX 2`, JSON.stringify(tx1, null, 4));
    console.log("r2:",EthUtil.bufferToHex(tx1.r));
    console.log("s2:",EthUtil.bufferToHex(tx1.s));
    console.log("v2:",EthUtil.bufferToHex(tx1.v));  
    const z2=tx1.hash(false).toString("hex");
    console.log ("z2=",z2);

    /*
    3° Ejecutar script reverse:
    python3 reversePrivateKey.py 
    privatekey:614f5e36cd55ddab0947d1723693fef5456e5bee24738ba90bd33c0c6e68e269
    k:4b7670ee80409a4acee8ff9351f17001534035ecb552e444e93ca6a4242c8afe
    */
    });
});
