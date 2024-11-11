require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0000000000000000000000000000000000000000000000000000000000000000";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 31337
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    sonic_mainnet: {
      url: "https://mainnet.sonic.fantom.network/rpc",
      chainId: 64240,
      accounts: [PRIVATE_KEY],
      verify: {
        explorer: {
          apiUrl: "https://explorer.sonic.fantom.network/api",
          browserUrl: "https://explorer.sonic.fantom.network"
        }
      }
    },
    sonic_testnet: {
      url: "https://testnet.sonic.fantom.network/rpc",
      chainId: 64241,
      accounts: [PRIVATE_KEY],
      verify: {
        explorer: {
          apiUrl: "https://testnet-explorer.sonic.fantom.network/api",
          browserUrl: "https://testnet-explorer.sonic.fantom.network"
        }
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};