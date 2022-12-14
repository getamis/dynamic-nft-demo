import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

task("mint", "mint NFTs")
  .addParam("name", "The contract name", "DynamicNFT")
  .addParam("contract", "The contract address", "0x89e2a1d650597d77b766f6D2B8Ec0333dd91F8ED")
  .addOptionalParam("to", "The destination address to receive NFT", "0xdd2c45b296C218779783c9AAF9f876391FA9aF53")
  .setAction(
    async (
      {
        name,
        contract,
        to,
      }: {
        name: string;
        contract: string;
        to?: string;
      },
      hre: HardhatRuntimeEnvironment
    ): Promise<void> => {
      const { ethers, network, run } = hre;
      const { name: networkName } = network;

      if (!contract) {
        console.log("Nothing to mint");
        return;
      }

      console.log("Network:", networkName);

      try {
        const accounts = await ethers.getSigners();
        const defaultAccount = accounts[0];

        const mintable = await ethers.getContractAt(name, contract);

        console.log("Minting ....");

        const tx = await mintable.mint(to || defaultAccount.address);

        console.log(`Minted: ${tx.hash}`);
      } catch (e) {
        console.error(e);
      }
    }
  );
