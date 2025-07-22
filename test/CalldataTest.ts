import {ethers} from "hardhat";
import { CalldataTest, CalldataTest__factory } from "../typechain-types";

describe("Calldata Test", function(){
    let calldataTest: CalldataTest;

    this.beforeEach(async function(){
        const factory = await ethers.getContractFactory("CalldataTest") as CalldataTest__factory;
        calldataTest = await factory.deploy();
    });

    it("Call sumWithMemory function", async function(){
        const params = [1, 2, 3, 4, 5, 6, 7];
        await calldataTest.sumWithMemory(params);
    });

    it("Call sumWithCalldata function", async function(){
        const params = [1, 2, 3, 4, 5, 6, 7];
        await calldataTest.sumWithCalldata(params);
    });

});