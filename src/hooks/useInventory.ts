// src/hooks/useInventory.ts
import { useEffect, useCallback } from 'react';
import { useGameStore } from '../stores/gameStore';
import { getInventory } from '../utils/storage';
import type { Currency } from '../types';

export function useInventory() {
  const address = useGameStore(state => state.address);
  const inventory = useGameStore(state => state.inventory);
  const setInventory = useGameStore(state => state.setInventory);
  const purchaseItemStore = useGameStore(state => state.purchaseItem);

  // Load inventory from IndexedDB when address changes
  useEffect(() => {
    if (!address) return;

    const loadInventory = async () => {
      const items = await getInventory(address);
      const skins = items.filter(id => id.startsWith('skin_'));
      const scenes = items.filter(id => id.startsWith('scene_'));
      const decorations = items.filter(id => id.startsWith('decor_'));

      console.log('Loading inventory from IndexedDB:', { skins, scenes, decorations });
      setInventory({ skins, scenes, decorations });
    };

    loadInventory();
  }, [address, setInventory]);

  const equipItem = useCallback((itemId: string) => {
    console.log('Equipping item:', itemId);
    if (itemId.startsWith('skin_')) {
      useGameStore.getState().equipSkin(itemId);
    } else if (itemId.startsWith('scene_')) {
      useGameStore.getState().equipScene(itemId);
    } else if (itemId.startsWith('decor_')) {
      useGameStore.getState().addDecoration(itemId);
    }
  }, []);

  const unequipDecoration = useCallback((decorationId: string) => {
    useGameStore.getState().removeDecoration(decorationId);
  }, []);

  const purchaseItem = useCallback(async (itemId: string, currency: Currency) => {
    if (!address) {
      console.error('No address connected');
      return false;
    }

    console.log('Purchasing item:', itemId, 'with currency:', currency);
    const success = await purchaseItemStore(itemId, currency, address);
    console.log('Purchase success:', success);

    if (success) {
      // Recargar inventario desde IndexedDB para sincronizar
      const items = await getInventory(address);
      const skins = items.filter(id => id.startsWith('skin_'));
      const scenes = items.filter(id => id.startsWith('scene_'));
      const decorations = items.filter(id => id.startsWith('decor_'));

      console.log('Reloaded inventory after purchase:', { skins, scenes, decorations });
      setInventory({ skins, scenes, decorations });
    }

    return success;
  }, [address, purchaseItemStore, setInventory]);

  return {
    ownedSkins: inventory.skins,
    ownedScenes: inventory.scenes,
    ownedDecorations: inventory.decorations,
    equippedSkin: useGameStore(state => state.equippedSkin),
    equippedScene: useGameStore(state => state.equippedScene),
    equippedDecorations: useGameStore(state => state.equippedDecorations),
    purchaseItem,
    equipItem,
    unequipDecoration
  };
}
