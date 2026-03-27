// src/App.tsx
import { ConnectButton } from './components/ConnectButton/ConnectButton';
import { BalanceDisplay } from './components/BalanceDisplay/BalanceDisplay';
import { Mascot } from './components/Mascot/Mascot';
import { Scene } from './components/Scene/Scene';
import { Shop } from './components/Shop/Shop';
import { useInventory } from './hooks/useInventory';
import { useGameStore } from './stores/gameStore';

function GameView() {
  const { equippedSkin, equippedScene, equippedDecorations } = useInventory();

  return (
    <div className="space-y-6">
      <Scene sceneId={equippedScene} decorations={equippedDecorations}>
        <Mascot skinId={equippedSkin} animation="idle" />
      </Scene>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Equipped Items</h2>
          <p className="text-gray-400 mb-2">Skin: {equippedSkin}</p>
          <p className="text-gray-400 mb-2">Scene: {equippedScene}</p>
          <p className="text-gray-400">
            Decorations: {equippedDecorations.length > 0 ? equippedDecorations.join(', ') : 'None'}
          </p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-bold mb-3">How to Play</h2>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Hold tokens to earn Balance Points</li>
            <li>• Stake to earn Rare Points</li>
            <li>• Buy items in the Shop</li>
            <li>• Equip skins and decorations</li>
          </ul>
        </div>
      </div>

      <Shop />
    </div>
  );
}

export default function App() {
  const isConnected = useGameStore(state => state.isConnected);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Bexo Pet 🐾
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Mascota virtual gamificada para Bexo Wallet
            </p>
          </div>
          <ConnectButton />
        </header>

        {isConnected ? (
          <>
            <BalanceDisplay />
            <div className="mt-6">
              <GameView />
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🦊</div>
            <h2 className="text-2xl font-bold mb-4">Welcome to Bexo Pet!</h2>
            <p className="text-gray-400 mb-2">
              Connect your Bexo Wallet to start playing
            </p>
            <p className="text-gray-500 text-sm">
              Earn points by holding tokens and staking, then customize your virtual pet!
            </p>
          </div>
        )}
      </div>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Built with XO Connect • 100% Frontend • No Backend</p>
      </footer>
    </div>
  );
}
