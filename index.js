const web3 = require('@solana/web3.js');
const bs58 = require('bs58');
const { transfer, getOrCreateAssociatedTokenAccount } = require('@solana/spl-token');

(async () => {
    // Initialize connection to the Solana network
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'));

    // Set sender's public and private keys
    const senderPrivateKey = bs58.decode("2eqn5FQMp812vQeo7TyXtEJNv3oMGom7n14PCKMAfyL7kvyrLqWyzr2g99RWhNRhDPvBKpKVvr1eDYUzTfKGsFAs");
    const senderPublicKey = web3.Keypair.fromSecretKey(senderPrivateKey).publicKey;
    const senderWallet = web3.Keypair.fromSecretKey(senderPrivateKey);


    // Set recipient's public key and token amount to send
    const recipientPublicKey = new web3.PublicKey('88o7Eq67spD6uh9M6TVszJDfMzJhfFLjro5hPMnzhwk2');
    const amount = 1000 * Math.pow(10, 9); // Amount of tokens to send

    // Set token program and mint address
    const mintAddress = new web3.PublicKey('G4qRXZqdJDCsjMyrV61ciAxqzgjnQRFyMoUnfACJPCG3');

    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      senderWallet,
      mintAddress,
      senderPublicKey
    );
    
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
})();
