// src/stores/gameStore.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from './gameStore';

describe('GameStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useGameStore.setState({
      isConnected: false,
      address: null,
      chainId: null,
      balancePoints: 0,
      rarePoints: 0,
      equippedSkin: 'skin_basic_dog',
      equippedScene: 'scene_basic_room',
      equippedDecorations: [],
      inventory: {
        skins: [],
        scenes: [],
        decorations: []
      }
    });
  });

  describe('setWallet', () => {
    it('should set wallet connection state', () => {
      useGameStore.getState().setWallet('0x1234567890123456789012345678901234567890', '0x1');

      const state = useGameStore.getState();
      expect(state.isConnected).toBe(true);
      expect(state.address).toBe('0x1234567890123456789012345678901234567890');
      expect(state.chainId).toBe('0x1');
    });
  });

  describe('updatePoints', () => {
    it('should update balance and rare points', () => {
      useGameStore.getState().updatePoints(1000, 500);

      const state = useGameStore.getState();
      expect(state.balancePoints).toBe(1000);
      expect(state.rarePoints).toBe(500);
    });
  });

  describe('equipSkin', () => {
    it('should equip a skin', () => {
      useGameStore.getState().equipSkin('skin_basic_dog');

      expect(useGameStore.getState().equippedSkin).toBe('skin_basic_dog');
    });
  });
});
