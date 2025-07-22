// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract CalldataTest {
    function sumWithMemory(uint[] memory _numbers) public pure returns (uint) {
        uint total = 0;
        for(uint i = 0; i < _numbers.length; i++){
            total += _numbers[i];
        }
        return total;
    }

    function sumWithCalldata(uint[] calldata _numbers) external pure returns (uint) {
        uint total = 0;
        for(uint i = 0; i < _numbers.length; i++){
            total += _numbers[i];
        }
        return total;
    }
}
