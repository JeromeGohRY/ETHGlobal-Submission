import { useMetaMaskTatum } from '../hooks/useMetaMaskTatum';

function MetaMaskTatumButton() {
  const { connectMetaMask, account, balance } = useMetaMaskTatum();

  return (
    <div>
      {account ? (
        <div>
          <div>Connected to: {account}</div>
          {balance?.data ? (
            <div>
              {balance.data.map((i) => (
                <div key={i.asset}>
                  <p>
                    {i.asset}: {i.balance}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <button onClick={connectMetaMask}>Connect MetaMask</button>
      )}
    </div>
  );
}

export default MetaMaskTatumButton;
