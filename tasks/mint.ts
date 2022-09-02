import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

task("mint", "mint NFTs")
  .addParam("name", "The contract name")
  .addParam("contract", "The contract address")
  .addOptionalParam("to", "The destination address to receive NFT")
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
