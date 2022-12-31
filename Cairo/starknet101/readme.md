# Starknet Message Bridging Writeup #

Hi, my name is Juan, i wrote this writeup to gain experience and help others to understand Starknet. 

Any comments/corrections please reach me at my twitter account: [@devnet0x](https://twitter.com/devnet0x/)

## Exercise 0 - Send an L2→L1→L2 message with existing contracts (2 pts) ##

Open evaluator [contract](https://goerli.voyager.online/contract/0x595bfeb84a5f95de3471fc66929710e92c12cce2b652cd91a6fef4c5c09cd99#writeContract) and go to ex_0_a function to add your L1 (goerli) account and some amount. In this example i will use 123 tokens (remember this token have 18 decimals).

![](./01.png)

Now, let's wait for our message to be sent to L1 (wait around 30 minutes).

![](./02.png)

We can see L1 hash transaction in bottom page:

![](./03.png)

Now, before minting our tokens in L1, we need to know the secret number (which in fact, is not secret because is stored in the blockchain). To know this number, we analize ex_0_a function and we can see this secret number used as parameter and sended to L1 (line 137):

![](./04.png)

So, we must go to goerli.etherscan.io and search our L1 hash transaction:

![](./05.png)

To get received parameters, press “click to see more” and in "input data" press "decode input data" button. Now, we can see all three parameters in decimal (account number, amount and secret number):

![](./06.png)

Thus, now let's go to dummy token on L1 ([link](https://goerli.etherscan.io/address/0x0232CB90523F181Ab4990Eb078Cf890F065eC395#writeContract)), connect our wallet and execute Mint with the amount and secret number.

![](./07.png)

Confirm our transaction in the wallet:

![](./08.png)

Now, let's execute i_have_tokens function which is processed by ex_0_b. If we analyze this function, we can see that validated secret number must have the original secret number (substract 32 as we can see prevously in line 135):

![](./09.png)


And confirm our transaction in the wallet to get our points

![](./10.png)

Also, we can go to L2 contract evaluator and verify received message

[received transaction](https://goerli.voyager.online/contract/0x0595bfeb84a5f95de3471fc66929710e92c12cce2b652cd91a6fef4c5c09cd99#transactions):

[received message](https://goerli.voyager.online/tx/0x13bbc32d32bcfb6c6da5f1c3991e53b9c3e66538805cfdccb05f9f1ad4507e8#messages)

Done.

## Exercise 1 - Send an L2→L1 message with your contract (2 pts) ##

(..soon)