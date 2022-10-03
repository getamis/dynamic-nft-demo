import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

task("setBaseUri", "set base uri")
  .addParam("name", "The contract name", "DynamicNFT")
  .addParam("contract", "The contract address", "0x89e2a1d650597d77b766f6D2B8Ec0333dd91F8ED")
  .addOptionalParam("baseUri", "The BaseUri", "ipfs://QmR57oqhbb9vDDgrS43hvMYgUExtLf35QtgXj4uPV81MYJ")
  .setAction(
    async (
      {
        name,
        contract,
        baseUri,
      }: {
        name: string;
        contract: string;
        baseUri: string;
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

        console.log("Setting base URI ....");

        const tx = await mintable.setBaseURI(baseUri);

        console.log(`Mined: ${tx.hash}`);
      } catch (e) {
        console.error(e);
      }
    }
  );
