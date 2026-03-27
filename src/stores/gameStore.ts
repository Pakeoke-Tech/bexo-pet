// src/stores/gameStore.ts
import { create } from 'zustand';
import type {
  Currency
} from '../types';
import { addItemToInventory, isItemOwned } from '../utils/storage';
import { useShopStore } from './shopStore';

interface GameStore {
  // Wallet state
  isConnected: boolean;
  address: string | null;
  chainId: string | null;
  walletBalance: string; // Balance real en Wei

  // Points
  balancePoints: number;
  rarePoints: number;

  // Equipped items
  equippedSkin: string;
  equippedScene: string;
  equippedDecorations: string[];

  // Inventory
  inventory: {
    skins: string[];
    scenes: string[];
    decorations: string[];
  };

  // Actions
  setWallet: (address: string, chainId: string) => void;
  setWalletBalance: (balance: string) => void;
  disconnectWallet: () => void;
  updatePoints: (balance: number, rare: number) => void;
  setInventory: (inventory: { skins: string[]; scenes: string[]; decorations: string[] }) => void;
  equipSkin: (skinId: string) => void;
  equipScene: (sceneId: string) => void;
  addDecoration: (decorationId: string) => void;
  removeDecoration: (decorationId: string) => void;
  purchaseItem: (itemId: string, currency: Currency, address: string) => Promise<boolean>;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  isConnected: false,
  address: null,
  chainId: null,
  walletBalance: '0',
  balancePoints: 0,
  rarePoints: 0,
  equippedSkin: 'skin_fpk1',
  equippedScene: 'scene_frame0000',
  equippedDecorations: [],
  inventory: {
    skins: [],
    scenes: [],
    decorations: []
  },

  // Actions
  setWallet: (address: string, chainId: string) => {
    set({ isConnected: true, address, chainId });
  },

  setWalletBalance: (balance: string) => {
    set({ walletBalance: balance });
  },

  disconnectWallet: () => {
    set({
      isConnected: false,
      address: null,
      chainId: null,
      walletBalance: '0',
      balancePoints: 0,
      rarePoints: 0,
      equippedSkin: 'skin_fpk1',
      equippedScene: 'scene_frame0000',
      equippedDecorations: []
    });
  },

  updatePoints: (balance: number, rare: number) => {
    set({ balancePoints: balance, rarePoints: rare });
  },

  setInventory: (inventory) => {
    set({ inventory });
  },

  equipSkin: (skinId: string) => {
    set({ equippedSkin: skinId });
  },

  equipScene: (sceneId: string) => {
    set({ equippedScene: sceneId });
  },

  addDecoration: (decorationId: string) => {
    const current = get().equippedDecorations;
    if (!current.includes(decorationId)) {
      set({ equippedDecorations: [...current, decorationId] });
    }
  },

  removeDecoration: (decorationId: string) => {
    const current = get().equippedDecorations;
    set({ equippedDecorations: current.filter(id => id !== decorationId) });
  },

  purchaseItem: async (itemId: string, currency: Currency, address: string) => {
    const item = useShopStore.getState().getItem(itemId);
    if (!item) return false;

    // Check if already owned
    const alreadyOwned = await isItemOwned(address, itemId);
    if (alreadyOwned) return false;

    // Check sufficient funds
    const points = currency === 'balance'
      ? get().balancePoints
      : get().rarePoints;

    if (points < item.price) return false;

    // Deduct points
    if (currency === 'balance') {
      set({ balancePoints: get().balancePoints - item.price });
    } else {
      set({ rarePoints: get().rarePoints - item.price });
    }

    // Add to inventory
    await addItemToInventory(address, itemId);


    return true;
  }
}));
