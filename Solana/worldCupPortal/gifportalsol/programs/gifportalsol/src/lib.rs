use anchor_lang::prelude::*;

declare_id!("7zCUzvH7h5XmKbsq2Qu9a7QMDgJV3gnMJ1afTvakCWrw");

#[program]
pub mod gifportalsol {
  use super::*;
  pub fn start_stuff_off(ctx: Context<StartStuffOff>) -> Result <()> {
    // Get a reference to the account.
    let base_account = &mut ctx.accounts.base_account;
    // Initialize total_gifs.
    base_account.total_gifs = 0;
    Ok(())
  }

  // The function now accepts a gif_link param from the user. 
  // We also reference the user from the Context
  pub fn add_gif(ctx: Context<AddGif>, gif_link: String) -> Result <()> {
     // Get a reference to the account and increment total_gifs.
     let base_account = &mut ctx.accounts.base_account;
     let user = &mut ctx.accounts.user;

     //Build the struct
     let item=ItemStruct{
        gif_link: gif_link.to_string(),
        user_address: *user.to_account_info().key,
     };

     //Add it to the gif_list vector
     base_account.gif_list.push(item);
     base_account.total_gifs += 1;
     Ok(())
  }
}


// Attach certain variables to the StartStuffOff context.
#[derive(Accounts)]
pub struct StartStuffOff<'info> {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>,
}

// Specify what data you want in the AddGif Context.
// Getting a handle on the flow of things :)?
#[derive(Accounts)]
pub struct AddGif<'info> {
  #[account(mut)]
  pub base_account: Account<'info, BaseAccount>,
  #[account(mut)]
  pub user: Signer<'info>,
}

// Create a custom struct for us to work with.
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ItemStruct {
    pub gif_link: String,
    pub user_address: Pubkey,
}

// Tell Solana what we want to store on this account.
#[account]
pub struct BaseAccount {
    pub total_gifs: u64,
    // Attach a Vector of type ItemStruct to the account.
    pub gif_list: Vec<ItemStruct>,
}