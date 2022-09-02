import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";
import * as dotenv from "dotenv";

import "./tasks";

dotenv.config({ path: __dirname + "/.env" });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

export default {
  solidity: "0.8.8",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
    },
    rinkeby: {
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
      url: "https://rpc.ankr.com/eth_rinkeby",
    },
    mainnet: {
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
      url: "https://rpc.ankr.com/eth",
    },
    mumbai: {
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
      url: "https://rpc.ankr.com/polygon_mumbai",
    },
    polygon: {
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
      url: `https://rpc.ankr.com/polygon`,
    },
  },
  namedAccounts: {},
  mocha: {
    timeout: 1000000,
  },
};
