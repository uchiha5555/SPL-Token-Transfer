
const bs58 = require('bs58');
const web3 = require('@solana/web3.js');
const { transfer, getOrCreateAssociatedTokenAccount } = require('@solana/spl-token');

require('dotenv').config();
// import AddressList
const addressList = require("./addressList.json")

//--------------------------------------------------------------------------------------------------------

const airdropTokens = async () => {
    // Initialize connection to the Solana network
  const connection = new web3.Connection(web3.clusterApiUrl('devnet'));

    // Set sender's public and private keys
  const senderPrivateKey = bs58.decode(process.env.PRIVATE_KEY);
  const senderWallet = web3.Keypair.fromSecretKey(senderPrivateKey);
  const senderPublicKey = senderWallet.publicKey;

    // Set token program and mint address
  const mintAddress = new web3.PublicKey(process.env.MINT_ADDRESS);

  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    senderWallet,
    mintAddress,
    senderPublicKey
  );

  const amount = 1000 * Math.pow(10, process.env.DECIMAL); // Amount of tokens to send

    // Address List
  for(let i = 0 ; i < addressList.length ; i++)
  {
    // Set recipient's public key and token amount to send
    const recipientPublicKey = new web3.PublicKey(addressList[i]);

    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      senderWallet,
      mintAddress,
      recipientPublicKey
    );
  
    const signature = await transfer(
      connection,
      senderWallet,
      fromTokenAccount.address,
      toTokenAccount.address,
      senderPublicKey,
      amount 
    );

    console.log(signature);
  }
}

airdropTokens();