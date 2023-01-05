// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IStarknetCore {
    /**
      Consumes a message that was sent from an L2 contract.
      Returns the hash of the message.
    */
    function consumeMessageFromL2(
        uint256 fromAddress,
        uint256[] calldata payload
    ) external returns (bytes32);
}

contract L1ConsumerContract {
    function consumeMessage(uint256 l2Evaluator, uint256 l2User) public {
        uint256[] memory payload = new uint256[](1);
        payload[0] = l2User;
        // Consume the message from the StarkNet core contract.
        // This will revert the (Ethereum) transaction if the message does not exist.
        IStarknetCore starknetCore = IStarknetCore(0xde29d060D45901Fb19ED6C6e959EB22d8626708e);
        starknetCore.consumeMessageFromL2(l2Evaluator, payload);
    }
}