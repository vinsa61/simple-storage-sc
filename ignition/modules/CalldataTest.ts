// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CalldataTestModule", (m) => {
  const calldataTest = m.contract("CalldataTest");

  // const tester = m.contract("Tester", [calldataTest]);

  return {calldataTest};
});

