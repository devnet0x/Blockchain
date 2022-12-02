import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDrop = await sdk.getContract("0xd7851f6cCc177D834198F91DFea56BE823DcFa76", "edition-drop");
    await editionDrop.createBatch([
      {
        name: "What are you thinking?",
        description: "This NFT will give you access to ProgrammersDAO!",
        image: readFileSync("scripts/assets/prog.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();