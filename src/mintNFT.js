import { Server, Keypair, TransactionBuilder, Operation } from '@stellar-sdk';

const mintNFT = async (contractID, metadataIPFS) => {
  try {
    // Replace with the Stellar testnet or mainnet endpoint
    const server = new Server('https://horizon-testnet.stellar.org');
    const account = await server.loadAccount('your-wallet-address');  // Load the wallet's account

    // Build the transaction to interact with the Soroban contract
    const transaction = new TransactionBuilder(account, { fee: 100 })
      .addOperation(Operation.invokeContract({
        contractId: contractID,
        method: 'mintNFT',
        parameters: [metadataIPFS], // Send IPFS metadata URL for the NFT
      }))
      .setTimeout(30)
      .build();

    // Sign the transaction with the user's wallet
    transaction.sign(Keypair.fromSecret('your-secret-key'));

    // Submit the transaction to the network
    const result = await server.submitTransaction(transaction);
    console.log('Transaction Successful:', result);
  } catch (error) {
    console.error('Minting NFT Failed:', error);
  }
};
