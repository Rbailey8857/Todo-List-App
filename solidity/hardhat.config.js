require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */
const GOERLI_PRIVATE_KEY = "f6a7f66667240b2ace693c2b181662115ed7cfd84abeb973d01d3c8592223ee6";


module.exports = {
  defaultNetwork: "goerli",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/0k5WRNZpxfZSQYENENexxXi6CkBUiFs5",
      accounts: [GOERLI_PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  },
  etherscan: {
    apiKey: {
      goerli: 'J5GZPF2VB51GJ98GJCAGUNSQ98FB5DN8NN'
    }
  }
}