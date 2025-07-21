// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

error UserAlreadyExists();
error UserInactive();

contract UserRegistry {
    struct User {
        uint id;
        uint balance;
        bool isActive;
    }
    mapping(address => User) public users;

    modifier isRegistered {
        if (users[msg.sender].id > 0){
            revert UserAlreadyExists();
        }
        _;
    }

    modifier isActive {
        if (!users[msg.sender].isActive) {
            revert UserInactive();
        }
        _;
    }

    function registerUser(uint _id, uint balance) public isRegistered {
        User storage user = users[msg.sender];
        user.id = _id;
        user.balance = balance;
        user.isActive = true;
    }

    function deactivateUser() public isActive {
        User storage user = users[msg.sender];
        user.isActive = false;
    }

    function deposit() public payable isActive {
        User storage user = users[msg.sender];
        user.balance += msg.value;
    }

    function withdraw() external payable isActive {
        User storage user = users[msg.sender];
        require(user.balance >= msg.value && msg.value > 0, "User balance is insufficient.");
        user.balance -= msg.value;

        (bool success, ) = msg.sender.call{value: msg.value}("");
        require(success, "Failed to send Ether.");
    }

}
