// src/components/Shop/Shop.tsx
import { useState } from 'react';
import { BASE_PATH } from '../../config';
import { useShopStore } from '../../stores/shopStore';
import { useInventory } from '../../hooks/useInventory';
import { useGameStore } from '../../stores/gameStore';
import type { Currency } from '../../types';

export function Shop() {
  const [activeTab, setActiveTab] = useState<Currency>('balance');
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  const balancePoints = useGameStore(state => state.balancePoints);
  const rarePoints = useGameStore(state => state.rarePoints);
  const { ownedSkins, ownedScenes, ownedDecorations, purchaseItem, equipItem } = useInventory();

  const items = useShopStore(state => state.getItemsByCurrency(activeTab));
  const filteredItems = selectedTier
    ? items.filter(item => item.tier === selectedTier)
    : items;

  const currentPoints = activeTab === 'balance' ? balancePoints : rarePoints;
  const ownedItems = [...ownedSkins, ...ownedScenes, ...ownedDecorations];

  const handlePurchase = async (itemId: string) => {
    const address = useGameStore.getState().address;
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    const success = await purchaseItem(itemId, activeTab);
    if (success) {
      alert(`Successfully purchased ${itemId}!`);
    } else {
      alert('Purchase failed - check if you have enough points or already own this item');
    }
  };

  const handleEquip = (itemId: string) => {
    equipItem(itemId);
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Shop 🛒</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('balance')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'balance'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Balance Points ({balancePoints.toLocaleString()})
        </button>
        <button
          onClick={() => setActiveTab('rare')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'rare'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Rare Points ({rarePoints.toLocaleString()})
        </button>
      </div>

      {/* Tier Filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setSelectedTier(null)}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            selectedTier === null ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'
          }`}
        >
          All
        </button>
        {[1, 2, 3, 4, 5, 6].map(tier => (
          <button
            key={tier}
            onClick={() => setSelectedTier(tier)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              selectedTier === tier ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'
            }`}
          >
            T{tier}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => {
          const isOwned = ownedItems.includes(item.id);
          const canAfford = currentPoints >= item.price;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                isOwned
                  ? 'border-green-500 bg-green-500/10'
                  : canAfford
                  ? 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  : 'border-gray-700 bg-gray-800 opacity-50'
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover rounded mb-2"
                style={{ imageRendering: 'pixelated' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `${BASE_PATH}assets/placeholder.svg`;
                }}
              />
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-sm text-gray-400">{item.description}</p>
              <p className="text-sm mt-2">
                Tier {item.tier} - {item.price.toLocaleString()} pts
              </p>

              {isOwned ? (
                <button
                  onClick={() => handleEquip(item.id)}
                  className="w-full mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded transition-colors"
                >
                  Equip
                </button>
              ) : (
                <button
                  onClick={() => handlePurchase(item.id)}
                  disabled={!canAfford}
                  className={`w-full mt-2 px-4 py-2 rounded transition-colors ${
                    canAfford
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-gray-600 cursor-not-allowed'
                  }`}
                >
                  {canAfford ? 'Buy' : 'Cannot afford'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
