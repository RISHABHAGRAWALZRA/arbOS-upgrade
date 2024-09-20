
import '@nomiclabs/hardhat-ethers'


import dotenv from 'dotenv'


dotenv.config()

const solidity = {
  compilers: [
    {
      version: '0.8.24',
      settings: {
        optimizer: {
          enabled: true,
          runs: 100,
        },
      },
    },
  ],

}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity,
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    geth: {
      url: 'http://localhost:8449',
      accounts: process.env['DEVNET_PRIVKEY']
        ? [process.env['DEVNET_PRIVKEY']]
        : [],
    },
  },
  mocha: {
    timeout: 0,
  },
  gasReporter: {
    enabled: process.env.DISABLE_GAS_REPORTER ? false : true,
  },
  typechain: {
    outDir: 'build/types',
    target: 'ethers-v5',
  },
  contractSizer: {
    strict: true
  }
}
