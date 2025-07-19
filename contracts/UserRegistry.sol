// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract UserRegistry {
    struct User {
        uint id;
        uint balance;
        bool isActive;
    }
    mapping(address => User) public users;

    function registerUser(uint _id, uint balance) public {
        users[msg.sender].id = _id;
        users[msg.sender].balance = balance;
        users[msg.sender].isActive = true;
    }

    function deactivateUser() public {
        users[msg.sender].isActive = false;
    }
}
