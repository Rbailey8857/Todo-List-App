require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()


module.exports = {
  defaultNetwork: "polygonMumbai",
  networks: {
    polygonMumbai: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./@allContracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.API_KEY
    }
  }
}