import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-ethers";
import "@typechain/hardhat";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    localnet: {
      url: "http://127.0.0.1:8545/",
    },
  },
  defaultNetwork: "localnet",
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6",
  },
};

export default config;
