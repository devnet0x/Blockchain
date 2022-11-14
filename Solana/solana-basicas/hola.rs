entrypoint!(process_instruction)
fn process_instruction(
    program_id: &Pubkey,
    accounts:&[AccountInfo],
    instruction_data:&[u8],
) -> ProgramResult{
    msg!("Hello Solana Faucet0x! (From Rust)");
    Ok(())
}