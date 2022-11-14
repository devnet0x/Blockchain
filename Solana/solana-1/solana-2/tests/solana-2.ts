import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Solana2 } from "../target/types/solana_2";

describe("solana-2", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Solana2 as Program<Solana2>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
