// src/components/BalanceDisplay/BalanceDisplay.tsx
import { useGameStore } from '../../stores/gameStore';

export function BalanceDisplay() {
  const balancePoints = useGameStore(state => state.balancePoints);
  const rarePoints = useGameStore(state => state.rarePoints);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
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
  );
}
