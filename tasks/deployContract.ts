import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Contract } from "ethers";

task("deployContract", "Deploy contract")
  .addParam("name", "The contract to be deployed", "")
  .addOptionalParam("args", "The arguments to the constructor")
  .setAction(
    async (
      {
        name,
        args,
      }: {
        name: string;
        args?: any[];
      },
      hre: HardhatRuntimeEnvironment
    ): Promise<void> => {
      const { ethers, network, run } = hre;
      const { name: networkName } = network;

      if (!name) {
        console.log("Nothing to be deployed");
        return;
      }

      console.log("Network:", networkName);

      try {
        await run("compile");

        const accounts = await ethers.getSigners();

        console.log(
          "Accounts:",
          accounts.map((a) => a.address)
        );

        const Contract = await ethers.getContractFactory(name);

        console.log("Deploying ....");

        let c: Contract;
        if (args && args.length > 0) {
          c = await Contract.deploy(args);
        } else {
          c = await Contract.deploy();
        }

        await c.deployed();

        console.log(`${name} deployed to:`, c.address);
      } catch (e) {
        console.error(e);
      }
    }
  );
