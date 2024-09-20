require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

const YOUR_PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.27',
    settings: {
      evmVersion: 'istanbul'
    }
  },
  networks: {
    devnet: {
      url: 'https://network.ambrosus-dev.io',
      accounts: [YOUR_PRIVATE_KEY]
    },
    testnet: {
      url: 'https://network.ambrosus-test.io',
      accounts: [YOUR_PRIVATE_KEY]
    },
    mainnet: {
      url: 'https://network.ambrosus.io',
      accounts: [YOUR_PRIVATE_KEY]
    }
  },
  etherscan: {
    enabled: false
  },
  sourcify: {
    enabled: true,
    apiUrl: 'https://sourcify.ambrosus.io/'
  }
};
