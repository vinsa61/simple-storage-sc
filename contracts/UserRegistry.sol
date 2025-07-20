// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

error UserAlreadyExists();

contract UserRegistry {
    struct User {
        uint id;
        uint balance;
        bool isActive;
    }
    mapping(address => User) public users;

    function registerUser(uint _id, uint balance) public {
        User storage user = users[msg.sender];
        if(user.isActive){
            revert UserAlreadyExists();
        }
        user.id = _id;
        user.balance = balance;
        user.isActive = true;
    }

    function deactivateUser() public {
        User storage user = users[msg.sender];
        require(user.isActive, "User is already inactive.");
        user.isActive = false;
    }

    function deposit() public payable {
        User storage user = users[msg.sender];
        require(user.isActive, "User is inactive or not registered.");
        user.balance += msg.value;
    }

}
