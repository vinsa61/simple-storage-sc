// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract SimpleStorage {
    mapping(uint => uint) public numberStorage;
    mapping(address => bool) public flagStorage;

    function setNumber(uint _index, uint _number) public {
        numberStorage[_index] = _number;
    }

    function setFlag(address _user, bool _flag) public {
        flagStorage[_user] = _flag;
    }

}
