// src/components/ConnectButton/ConnectButton.tsx
import { useXOConnect } from '../../hooks/useXOConnect';
import { shortenAddress } from '../../utils/blockchain';

export function ConnectButton() {
  const { isConnected, address, connect, disconnect, error } = useXOConnect();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <div className="px-4 py-2 bg-green-500/20 border border-green-500 rounded-lg">
          <span className="text-green-400 text-sm font-mono">
            {shortenAddress(address, 6)}
          </span>
        </div>
        <button
          onClick={disconnect}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors text-sm font-semibold"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={connect}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors shadow-lg"
      >
        Connect Bexo Wallet
      </button>
      {error && (
        <p className="text-red-400 text-sm">
          {error.message.includes('rejected')
            ? 'Connection rejected by user'
            : error.message.includes('pending')
            ? 'Request pending in wallet'
            : 'Error connecting to Bexo Wallet'}
        </p>
      )}
    </div>
  );
}
