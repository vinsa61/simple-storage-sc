import {ethers} from "hardhat";
import { CalldataTest, CalldataTest__factory} from "../typechain-types";

describe("Calldata Test", function(){
    let calldataTest: CalldataTest;

    this.beforeEach(async function(){
        const calldataFactory = await ethers.getContractFactory("CalldataTest") as CalldataTest__factory;
        calldataTest = await calldataFactory.deploy();
    });

    it("Call sumWithMemory function", async function(){
        const params = [1, 2, 3, 4, 5, 6, 7];
        await calldataTest.sumWithMemory(params);
    });

    it("Call sumWithCalldata function", async function(){
        const params = [1, 2, 3, 4, 5, 6, 7];
        await calldataTest.sumWithCalldata(params);
    });

    
    it("Call increment function", async function(){
        await calldataTest.increment();
    });

});