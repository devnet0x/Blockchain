//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract JPTOKEN is ERC20, Ownable {
    constructor() ERC20("JPTOKEN", "JPT") {
        _mint(msg.sender, 2000000 * 10 ** decimals());
    }
}
