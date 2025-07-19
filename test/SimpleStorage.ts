import { assert } from "chai";
import { ethers } from "hardhat";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";
import { Signer } from "ethers";

describe("Simple Storage Test", function(){
  let simpleStorage: SimpleStorage;
  let account: Signer;

  beforeEach( async function() {
    [account] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("SimpleStorage") as SimpleStorage__factory;
    simpleStorage = await factory.deploy();
  });

  it("Deploy Success", async function(){
    assert.isOk(await simpleStorage.getAddress());
  });

  it("Set and Retrieve Value from numberStorage", async function(){
    await simpleStorage.setNumber(7, 10);
    assert.equal(await simpleStorage.numberStorage(7), 10n);
  });

  it("Querying unset index in numberStorage", async function(){
    assert.equal(await simpleStorage.numberStorage(5), 0n);
  });
  
  it("Set and Retrieve Value from flagStorage", async function(){
    const address = await account.getAddress();
    await simpleStorage.setFlag(address, true);
    assert.equal(await simpleStorage.flagStorage(address), true);
  });
  
  it("Querying unset index in flagStorage", async function(){
    const address = await account.getAddress();
    assert.equal(await simpleStorage.flagStorage(address), false);
  });

});