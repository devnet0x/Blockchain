# Damn Vulnerable Defi Foundry Writeup #

Hi, my name is Juan,  i wrote this writeup to help anybody interested in develop Smart contract auditing skills. I previously resolved other challenges as Ethernaut and CaptureTheEther so i recommend try them before get into this more advanced Defi challenges so i will asume you have a previous basic knowledge.

Any comments/corrections please reach me at my twitter account: **@devnet0x**

## Challenge 1: Unstoppable ##
We as attacker's must transfer 1 token to lender pool to create a difference between poolBalance and balanceBefore in this line from function flashloan():
        
        `if (poolBalance != balanceBefore) revert AssertionViolated();`
        

Then, nobody else will be able to borrow a flashloan:

`   function testExploit() public {
        /** EXPLOIT START **/
        vm.startPrank(attacker);
        // We (attacker) transfer 1 token to lender pool to create a difference
        // between poolBalance and balanceBefore in this line from function flashloan():
        //
        // if (poolBalance != balanceBefore) revert AssertionViolated();
        //
        dvt.transfer(address(unstoppableLender), 1 ether);
        vm.stopPrank();
        /** EXPLOIT END **/
        vm.expectRevert(UnstoppableLender.AssertionViolated.selector);
        validation();
    }`


Source Code:
[https://github.com/devnet0x/Blockchain/tree/master/ChallengesCTF/A-maze-x/0_Vitatoken](https://github.com/devnet0x/Blockchain/tree/master/ChallengesCTF/DVDF_Foundry/01_Unstoppable)


##  Challenge 1: What a nice Lender Pool! ##
Analyzing the contract, what we need to do is try to withdraw ISEC but how can we do that if we dont have any balance?.
When analyze contract vulnerabilities, i’m always start searching for eventual reentrancy points (transfers with post balance update) and delegatecall (to manipulate variables using the same slots). In this case i found a delegatecall inside flashloan function, so it look like we can use this delegatecall to change the following contract global variables:

![](./img/06.png)

Then, we can change balances using delegatecall function and reusing the same memory slots to set values as we want.
So, let’s create a contract that borrow a flashloan (function exploit), call a custom function (changedata) to set balance to our contract account and withdraw all the ISEC. (after that, you can easily transfer all balance to your player account if you want).

![](./img/07.png)

This is the deploy script used to set up challenge:

![](./img/08.png)

And this is the test sequence (only call to our attackers contract and change contract addresses for those deployed in your environment):

![](./img/09.png)

Source Code:
https://github.com/devnet0x/Blockchain/tree/master/ChallengesCTF/A-maze-x/1_LenderPool

## Challenge 2: it's always sunny in decentralized exchanges ##
In this challenge, we need to drain liquidity from the Dex, so analyzing contract we need to removeLiquidity, but how ca we do that if only can remove the same amount that we previously deposited?.
Analyzing removeLiquidity function, we can see a transfer call previous to update balance so it’s a candidate to reentrancy calling this function recursively from a contract’s fallback. But, how can we do a fallback if no ethers transfer?, the answer is in ERC223 token implementation, where we can see a fallback call after transfer (as defined in ERC223 standard):

![](./img/10.png)

Then we implement a contract which deposit liquidity, and then remove liquidity with a malicious tokenFallback function (after that, you can easily transfer all balance to your player account if you want):

![](./img/11.png)

Finally, let’s deploy and setup our challenge (see deploy.js) and runit with this script (test.js):

![](./img/12.png)

Source Code:
https://github.com/devnet0x/Blockchain/tree/master/ChallengesCTF/A-maze-x/2_Dex


## Challenge 3: borrow, hide and seek ##
Finally, in this challenge, as mentioned in the “familiar concepts section”, we must proceed with a oracle price attack, so lets build a contract which implement all known 4 steps in this kind of attack:

1. Attacker borrows a large amount of token A from a protocol supporting flash loans.

![](./img/13.png)

2. Attacker swaps token A for token B on a DEX (lowering the spot price of token A and increasing the spot price of token B on the DEX).

![](./img/14.png)

3. Attacker deposits the purchased token B as collateral on a DeFi protocol that uses the spot price from the above DEX as its sole price feed, and uses the manipulated spot price to borrow a larger amount of token A than should normally be possible.

![](./img/15.png)

4. Attacker uses a portion of borrowed token A to fully pay back the original flash loan and keep the remaining tokens, generating a profit using the protocol’s manipulated price feed.

![](./img/16.png)

Then, lets deploy and setup our challenge with deploy.js and finally lets test our exploit with test.js (after that, you can easily transfer all balance to your player account if you want).:

![](./img/17.png)

Source Code:

https://github.com/devnet0x/Blockchain/tree/master/ChallengesCTF/A-maze-x/3_Borrower
