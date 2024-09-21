import { useEffect, useState } from 'react';
import { TatumSDK, Network, MetaMask } from '@tatumio/tatum';

export function useMetaMaskTatum() {
  const [account, setAccount] = useState(null);
  const [tatumInstance, setTatumInstance] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (account && tatumInstance) {
        const balance = await tatumInstance.address.getBalance({
          addresses: [account],
          tokenTypes: ['native']
        });
        setBalance(balance);
      }
    };

    fetchBalance();
  }, [account, tatumInstance]);

  const connectMetaMask = async () => {
    const apiKey = import.meta.env.VITE_TATUM_API_KEY;

    const tatum = await TatumSDK.init({
      network: Network.ETHEREUM,
      apiKey
    });

    const metamaskAccount = await tatum.walletProvider
      .use(MetaMask)
      .getWallet();

    console.log('account', metamaskAccount);

    setAccount(metamaskAccount);
    setTatumInstance(tatum);
  };

  return { connectMetaMask, account, balance };
}
