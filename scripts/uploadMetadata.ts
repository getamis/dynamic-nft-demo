import { globSource } from "ipfs-http-client";
import { createIPFSClient } from "../src/ipfs";

async function main() {
  const ipfsClient = await createIPFSClient();

  for await (const file of ipfsClient.addAll(
    globSource("metadata", "metadata", {
      hidden: true,
    }),
    { pin: true }
  )) {
    console.log("cid", file.cid, "path", file.path);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
