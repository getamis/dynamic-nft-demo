import { create } from "ipfs-http-client";

import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env" });

export const createIPFSClient = async () => {
  const projectId = process.env.INFURA_IPFS_PROJECT_ID;
  const projectSecret = process.env.INFURA_IPFS_PROJECT_SECRET;
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

  return create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
    timeout: "30m",
  });
};
