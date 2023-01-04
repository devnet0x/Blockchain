// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IStarknetCore {
    // Sends a message to an L2 contract. Returns the hash of the message.
    function sendMessageToL2(
        uint256 to_address,
        uint256 selector,
        uint256[] calldata payload
    ) external returns (bytes32);
}

contract L1Contract {
    function sendMsgToL2() public returns (bytes32) {
        uint256 L2ContractAddress=0x595bfeb84a5f95de3471fc66929710e92c12cce2b652cd91a6fef4c5c09cd99;
        uint256 L2ContractSelector=897827374043036985111827446442422621836496526085876968148369565281492581228;
        uint256 l2_user=0x03cDc592C01DaD4d9fc903e02C8610b043eED0692a54BDA704D88DbB2a6Bc2E0;
        uint256[] memory payload = new uint256[](1);
        payload[0] = l2_user;
        // Send the message to the StarkNet core contract.
        IStarknetCore starknetCore = IStarknetCore(0xde29d060D45901Fb19ED6C6e959EB22d8626708e);
        bytes32 res=starknetCore.sendMessageToL2(
            L2ContractAddress,
            L2ContractSelector,
            payload
        );
        return(res);
    }
}