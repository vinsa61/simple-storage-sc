import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { UserRegistry, UserRegistry__factory } from "../typechain-types";
import { Signer } from "ethers";
import "@nomicfoundation/hardhat-chai-matchers";

describe("User Registry Test", function () {
  let userRegistry: UserRegistry;
  let account: Signer;

  this.beforeEach(async function () {
    [account] = await ethers.getSigners();
    let factory = (await ethers.getContractFactory(
      "UserRegistry"
    )) as UserRegistry__factory;
    userRegistry = await factory.deploy();
  });

  it("Register User", async function () {
    await userRegistry.registerUser(1, 1000);
    const user = await userRegistry.users(await account.getAddress());
    assert.equal(user.id, 1n);
    assert.equal(user.balance, 1000n);
  });

  it("Deactivate User", async function () {
    await userRegistry.registerUser(1, 1000);
    await userRegistry.deactivateUser();
    const user = await userRegistry.users(await account.getAddress());
    assert.equal(user.isActive, false);
    assert.equal(user.id, 1n);
    assert.equal(user.balance, 1000n);
  });

  it("Default Value", async function () {
    const unknown = await userRegistry.users(await account.getAddress());
    assert.equal(unknown.id, 0n);
    assert.equal(unknown.balance, 0n);
    assert.equal(unknown.isActive, false);
  });

  it("Register Existing User", async function () {
    await userRegistry.registerUser(1, 1000);
    await expect(
      userRegistry.registerUser(1, 1000)
    ).to.be.revertedWithCustomError(userRegistry, "UserAlreadyExists");
  });

  it("Deactivate Inactive User", async function () {
    await expect(userRegistry.deactivateUser()).to.be.revertedWith(
      "User is already inactive."
    );
  });

  it("Registered User Deposit", async function () {
    await userRegistry.registerUser(1, 0);
    await userRegistry
      .connect(account)
      .deposit({ value: ethers.parseEther("1.0") });
    const user = await userRegistry.users(await account.getAddress());
    assert.equal(user.balance, ethers.parseEther("1.0"));
  });

  it("Unregistered or Inactive User Deposit", async function () {
    await expect(
      userRegistry.connect(account).deposit({ value: ethers.parseEther("1.0") })
    ).to.be.revertedWith("User is inactive or not registered.");
  });
});
