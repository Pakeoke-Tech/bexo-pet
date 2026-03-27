// src/components/BalanceDisplay/BalanceDisplay.tsx
import { useGameStore } from '../../stores/gameStore';

export function BalanceDisplay() {
  const walletBalance = useGameStore(state => state.walletBalance);
  const balancePoints = useGameStore(state => state.balancePoints);
  const rarePoints = useGameStore(state => state.rarePoints);
  const chainId = useGameStore(state => state.chainId);

  // Convertir Wei a ETH (1 ETH = 10^18 Wei)
  const balanceInEth = (parseInt(walletBalance, 16) / 1e18).toFixed(6);

  // Obtener símbolo de la red
  const getNetworkSymbol = (cid: string | null) => {
    if (!cid) return 'ETH';
    const chainIdDecimal = parseInt(cid, 16);
    switch (chainIdDecimal) {
      case 1: return 'ETH';
      case 137: return 'MATIC';
      case 56: return 'BNB';
      default: return 'ETH';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-4">
      {/* Wallet Balance - Nuevo */}
      <div className="p-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg border border-yellow-700/30">
        <div className="text-center">
          <p className="text-yellow-400 text-sm font-semibold mb-1">💰 Wallet Balance</p>
          <p className="text-3xl font-bold text-yellow-300">
            {parseFloat(balanceInEth) === 0 ? '0.000000' : balanceInEth} {getNetworkSymbol(chainId)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Balance real de Bexo Wallet</p>
        </div>
      </div>

      {/* Game Points */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-800 rounded-lg shadow-xl">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">Balance Points</p>
          <p className="text-2xl font-bold text-blue-400">
            {formatNumber(balancePoints)}
          </p>
          <p className="text-xs text-gray-500">Balance × 5</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">Rare Points</p>
          <p className="text-2xl font-bold text-purple-400">
            {formatNumber(rarePoints)}
          </p>
          <p className="text-xs text-gray-500">From Staking</p>
        </div>
      </div>
    </div>
  );
}
