// src/stores/shopStore.ts
import { create } from 'zustand';
import { BASE_PATH } from '../config';
import type { ShopItem, ItemTier } from '../types';

// Pricing configuration (rangos por tier)
export const ITEM_TIERS: Record<ItemTier, { name: string; price: number }> = {
  1: { name: 'Básico', price: 100 },
  2: { name: 'Común', price: 2000 },
  3: { name: 'Raro', price: 5000 },
  4: { name: 'Épico', price: 20000 },
  5: { name: 'Legendario', price: 100000 },
  6: { name: 'Exclusivo', price: 500000 }
};

// Shop items catalog
const SHOP_ITEMS: Record<string, ShopItem> = {
  // =================== SKINS (Rare Points) ===================
  'skin_fpk1': {
    id: 'skin_fpk1',
    name: 'Personaje Básico 1',
    description: 'Primer personaje de la colección',
    tier: 1,
    currency: 'rare',
    price: 100,
    image: `${BASE_PATH}assets/skins/fpk1.png`,
    category: 'skin'
  },
  'skin_fpk2': {
    id: 'skin_fpk2',
    name: 'Personaje Básico 2',
    description: 'Segundo personaje inicial',
    tier: 1,
    currency: 'rare',
    price: 150,
    image: `${BASE_PATH}assets/skins/fpk2.png`,
    category: 'skin'
  },
  'skin_fpk3': {
    id: 'skin_fpk3',
    name: 'Personaje Común 1',
    description: 'Personaje de nivel común',
    tier: 2,
    currency: 'rare',
    price: 2000,
    image: `${BASE_PATH}assets/skins/fpk3.png`,
    category: 'skin'
  },
  'skin_fpk4': {
    id: 'skin_fpk4',
    name: 'Personaje Común 2',
    description: 'Otro personaje común',
    tier: 2,
    currency: 'rare',
    price: 2500,
    image: `${BASE_PATH}assets/skins/fpk4.png`,
    category: 'skin'
  },
  'skin_fpk5': {
    id: 'skin_fpk5',
    name: 'Personaje Raro 1',
    description: 'Personaje de colección rara',
    tier: 3,
    currency: 'rare',
    price: 5000,
    image: `${BASE_PATH}assets/skins/fpk5.png`,
    category: 'skin'
  },
  'skin_fpk6': {
    id: 'skin_fpk6',
    name: 'Personaje Raro 2',
    description: 'Personaje raro especial',
    tier: 3,
    currency: 'rare',
    price: 6000,
    image: `${BASE_PATH}assets/skins/fpk6.png`,
    category: 'skin'
  },
  'skin_fpk7': {
    id: 'skin_fpk7',
    name: 'Personaje Épico 1',
    description: 'Personaje de nivel épico',
    tier: 4,
    currency: 'rare',
    price: 20000,
    image: `${BASE_PATH}assets/skins/fpk7.png`,
    category: 'skin'
  },
  'skin_fpk8': {
    id: 'skin_fpk8',
    name: 'Personaje Épico 2',
    description: 'Personaje épico legendario',
    tier: 4,
    currency: 'rare',
    price: 25000,
    image: `${BASE_PATH}assets/skins/fpk8.png`,
    category: 'skin'
  },
  'skin_fpk9': {
    id: 'skin_fpk9',
    name: 'Personaje Legendario',
    description: 'Personaje legendario único',
    tier: 5,
    currency: 'rare',
    price: 100000,
    image: `${BASE_PATH}assets/skins/fpk9.png`,
    category: 'skin'
  },
  'skin_fpk10': {
    id: 'skin_fpk10',
    name: 'Personaje Exclusivo',
    description: 'El personaje más exclusivo',
    tier: 6,
    currency: 'rare',
    price: 500000,
    image: `${BASE_PATH}assets/skins/fpk10.png`,
    category: 'skin'
  },

  // =================== SCENES (Balance Points) ===================
  'scene_frame0000': {
    id: 'scene_frame0000',
    name: 'Escenario Básico 1',
    description: 'Habitación simple y acogedora',
    tier: 1,
    currency: 'balance',
    price: 100,
    image: `${BASE_PATH}assets/scenes/frame0000.png`,
    category: 'scene'
  },
  'scene_frame0001': {
    id: 'scene_frame0001',
    name: 'Escenario Básico 2',
    description: 'Otro cuarto simple',
    tier: 1,
    currency: 'balance',
    price: 150,
    image: `${BASE_PATH}assets/scenes/frame0001.png`,
    category: 'scene'
  },
  'scene_frame0002': {
    id: 'scene_frame0002',
    name: 'Escenario Común 1',
    description: 'Espacio común amplio',
    tier: 2,
    currency: 'balance',
    price: 2000,
    image: `${BASE_PATH}assets/scenes/frame0002.png`,
    category: 'scene'
  },
  'scene_frame0004': {
    id: 'scene_frame0004',
    name: 'Escenario Común 2',
    description: 'Otro espacio común',
    tier: 2,
    currency: 'balance',
    price: 2500,
    image: `${BASE_PATH}assets/scenes/frame0004.png`,
    category: 'scene'
  },
  'scene_frame1': {
    id: 'scene_frame1',
    name: 'Escenario Raro',
    description: 'Escenario de colección rara',
    tier: 3,
    currency: 'balance',
    price: 5000,
    image: `${BASE_PATH}assets/scenes/frame1.png`,
    category: 'scene'
  },
  'scene_frame2': {
    id: 'scene_frame2',
    name: 'Escenario Épico 1',
    description: 'Escenario épico impresionante',
    tier: 4,
    currency: 'balance',
    price: 20000,
    image: `${BASE_PATH}assets/scenes/frame2.png`,
    category: 'scene'
  },
  'scene_frame3': {
    id: 'scene_frame3',
    name: 'Escenario Épico 2',
    description: 'El escenario más épico',
    tier: 4,
    currency: 'balance',
    price: 28000,
    image: `${BASE_PATH}assets/scenes/frame3.png`,
    category: 'scene'
  },

  // =================== DECORATIONS (Balance Points) ===================
  'decor_crate1': {
    id: 'decor_crate1',
    name: 'Caja de Madera 1',
    description: 'Caja básica de almacenaje',
    tier: 1,
    currency: 'balance',
    price: 100,
    image: `${BASE_PATH}assets/decor/Crate1.png`,
    category: 'decoration'
  },
  'decor_vase1': {
    id: 'decor_vase1',
    name: 'Jarrón Básico 1',
    description: 'Jarrón simple decorativo',
    tier: 1,
    currency: 'balance',
    price: 120,
    image: `${BASE_PATH}assets/decor/Vase1.png`,
    category: 'decoration'
  },
  'decor_vase2': {
    id: 'decor_vase2',
    name: 'Jarrón Básico 2',
    description: 'Otro jarrón simple',
    tier: 1,
    currency: 'balance',
    price: 130,
    image: `${BASE_PATH}assets/decor/Vase2.png`,
    category: 'decoration'
  },
  'decor_crate2': {
    id: 'decor_crate2',
    name: 'Caja de Madera 2',
    description: 'Caja de nivel común',
    tier: 2,
    currency: 'balance',
    price: 2000,
    image: `${BASE_PATH}assets/decor/Crate2.png`,
    category: 'decoration'
  },
  'decor_crate3': {
    id: 'decor_crate3',
    name: 'Caja Reforzada',
    description: 'Caja común reforzada',
    tier: 2,
    currency: 'balance',
    price: 2200,
    image: `${BASE_PATH}assets/decor/Crate3.png`,
    category: 'decoration'
  },
  'decor_vase3': {
    id: 'decor_vase3',
    name: 'Jarrón Común 1',
    description: 'Jarrón de mejor calidad',
    tier: 2,
    currency: 'balance',
    price: 2500,
    image: `${BASE_PATH}assets/decor/Vase3.png`,
    category: 'decoration'
  },
  'decor_vase4': {
    id: 'decor_vase4',
    name: 'Jarrón Común 2',
    description: 'Jarrón común decorativo',
    tier: 2,
    currency: 'balance',
    price: 2800,
    image: `${BASE_PATH}assets/decor/Vase4.png`,
    category: 'decoration'
  },
  'decor_vase5': {
    id: 'decor_vase5',
    name: 'Jarrón Raro',
    description: 'Jarrón de colección rara',
    tier: 3,
    currency: 'balance',
    price: 5000,
    image: `${BASE_PATH}assets/decor/Vase5.png`,
    category: 'decoration'
  },
  'decor_vase6': {
    id: 'decor_vase6',
    name: 'Jarrón Épico',
    description: 'El jarrón más épico',
    tier: 4,
    currency: 'balance',
    price: 20000,
    image: `${BASE_PATH}assets/decor/Vase6.png`,
    category: 'decoration'
  }
};

interface ShopStore {
  items: typeof SHOP_ITEMS;
  getItem: (itemId: string) => ShopItem | undefined;
  getItemsByTier: (tier: ItemTier) => ShopItem[];
  getItemsByCategory: (category: 'skin' | 'scene' | 'decoration') => ShopItem[];
  getItemsByCurrency: (currency: 'balance' | 'rare') => ShopItem[];
}

export const useShopStore = create<ShopStore>(() => ({
  items: SHOP_ITEMS,

  getItem: (itemId) => {
    return SHOP_ITEMS[itemId];
  },

  getItemsByTier: (tier) => {
    return Object.values(SHOP_ITEMS).filter(item => item.tier === tier);
  },

  getItemsByCategory: (category) => {
    return Object.values(SHOP_ITEMS).filter(item => item.category === category);
  },

  getItemsByCurrency: (currency) => {
    return Object.values(SHOP_ITEMS).filter(item => item.currency === currency);
  }
}));
