import React, { useState, useEffect } from 'react';
import { Wallet } from '@stellar/wallet-sdk';

const StellarWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    try {
      const wallet = await Wallet.create({
        network: 'testnet', // Use 'public' for the mainnet
      });
      setWallet(wallet);
      await wallet.connect();
      const account = await wallet.getAccount();
      setAccount(account);
    } catch (err) {
      console.error('Error connecting wallet:', err);
    }
  };

  return (
    <div>
      {account ? (
        <div>
          <h2>Connected Account</h2>
          <p>Public Key: {account.publicKey}</p>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default StellarWallet;
