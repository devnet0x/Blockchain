### **Welcome 👋**
To get started with this project, clone this repo and follow these commands:

1. Run `npm install` at the root of your directory
2. Run `npm start` to start the project
2. To Setup:

Connect to goerli (don't forget to setup your wallet private_key on .env):
xubuntu@xubuntu:~/solidity/jpdao$ node scripts/1-initialize-sdk.js
👋 SDK initialized by address: 0xAa0E23a3ac47b0E67c63b19DF4656DD77b3cED59

Deploy DAO and NFT (with erc-1155) to validate user membership:
xubuntu@xubuntu:~/solidity/jpdao$ node scripts/2-deploy-drop.js
👋 SDK initialized by address: 0xAa0E23a3ac47b0E67c63b19DF4656DD77b3cED59
✅ Successfully deployed editionDrop contract, address: 0xd7851f6cCc177D834198F91DFea56BE823DcFa76
✅ editionDrop metadata: {
  name: 'ProgrammersDAO Membership',
  description: 'A DAO for programmers.',
  image: 'https://gateway.ipfscdn.io/ipfs/QmT6iVJ3wWByJoHVzmXVqud1VJAhrKgRWh5anjH3GivyzU/0',
  seller_fee_basis_points: 0,
  fee_recipient: '0x0000000000000000000000000000000000000000',
  merkle: {},
  symbol: ''
}

Setup our NFT:
xubuntu@xubuntu:~/solidity/jpdao$ node scripts/3-config-nft.js
👋 SDK initialized by address: 0xAa0E23a3ac47b0E67c63b19DF4656DD77b3cED59
✅ Successfully created a new NFT in the drop!

Set how can we mint out NFT (no restrictions, anybody can):
xubuntu@xubuntu:~/solidity/jpdao$ node scripts/4-set-claim-condition.js
👋 SDK initialized by address: 0xAa0E23a3ac47b0E67c63b19DF4656DD77b3cED59
✅ Sucessfully set claim condition!

Deploy our governance token ($PROG):
xubuntu@xubuntu:~/solidity/jpdao$ node scripts/5-deploy-token.js
👋 SDK initialized by address: 0xAa0E23a3ac47b0E67c63b19DF4656DD77b3cED59
✅ Successfully deployed token contract, address: 0x57461B4cc03B4c93226eac48389599E3E555FfC7

Mint initial token supply:
xubuntu@xubuntu:~/solidity/jpdao$ node scripts/6-print-money.js
👋 SDK initialized by address: 0xAa0E23a3ac47b0E67c63b19DF4656DD77b3cED59
✅ There now is 1000000.0 $PROG in circulation

Change provider from quicknode to alchemy

Let's get some tokens from initial supply:
xubuntu@xubuntu:~/solidity/jpdao$ node scripts/7-airdrop-token.js
👋 SDK initialized by address: 0xAa0E23a3ac47b0E67c63b19DF4656DD77b3cED59
✅ Going to airdrop 1270 tokens to 0xAa0E23a3ac47b0E67c63b19DF4656DD77b3cED59
🌈 Starting airdrop...
✅ Successfully airdropped $PROG tokens to all the holders of the NFT!

Deploy our governance contract:
xubuntu@xubuntu:~/solidity/jpdao$  node scripts/8-deploy-vote.js
👋 SDK initialized by address: 0xAa0E23a3ac47b0E67c63b19DF4656DD77b3cED59
✅ Successfully deployed vote contract, address: 0x2A6eB7601575221F1620245587A364f566A4767A

Setup governance (anybody can vote, 1 address=1 vote):
xubuntu@xubuntu:~/solidity/jpdao$ node scripts/9-setup-vote.js
👋 SDK initialized by address: 0xAa0E23a3ac47b0E67c63b19DF4656DD77b3cED59
Successfully gave vote contract permissions to act on token contract
✅ Successfully transferred 900000 tokens to vote contract
xubuntu@xubuntu:~/solidity/jpdao$

Create a proposal (drop some tokens to NFT minters):
xubuntu@xubuntu:~/solidity/jpdao$ node scripts/10-create-vote-proposals.js
👋 SDK initialized by address: 0xAa0E23a3ac47b0E67c63b19DF4656DD77b3cED59
✅ Successfully created proposal to mint tokens
✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!

Remove our admin role so only DAO members can setup changes (in proposals):
xubuntu@xubuntu:~/solidity/jpdao$ node scripts/11-revoke-roles.js
👋 SDK initialized by address: 0xAa0E23a3ac47b0E67c63b19DF4656DD77b3cED59
👀 Roles that exist right now: {
  admin: [ '0xAa0E23a3ac47b0E67c63b19DF4656DD77b3cED59' ],
  minter: [
    '0xAa0E23a3ac47b0E67c63b19DF4656DD77b3cED59',
    '0x2A6eB7601575221F1620245587A364f566A4767A'
  ],
  transfer: [
    '0xAa0E23a3ac47b0E67c63b19DF4656DD77b3cED59',
    '0x0000000000000000000000000000000000000000'
  ]
}
🎉 Roles after revoking ourselves {
  admin: [],
  minter: [],
  transfer: [
    '0xAa0E23a3ac47b0E67c63b19DF4656DD77b3cED59',
    '0x0000000000000000000000000000000000000000'
  ]
}
✅ Successfully revoked our superpowers from the ERC-20 contract
xubuntu@xubuntu:~/solidity/jpdao$ 

