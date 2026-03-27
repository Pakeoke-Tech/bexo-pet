// src/lib/xo-connect.ts
import { XOConnectProvider } from 'xo-connect';

// Global provider instance
let providerInstance: XOConnectProvider | null = null;

/**
 * Initialize XO Connect Provider with RPC configuration
 * Must be called before using any blockchain functionality
 */
export function initializeXOConnect(): XOConnectProvider {
  if (providerInstance) {
    return providerInstance;
  }

  providerInstance = new XOConnectProvider({
    rpcs: {
      "0x1": import.meta.env.VITE_ETH_RPC || 'https://eth.llamarpc.com',
      "0x89": import.meta.env.VITE_POLYGON_RPC || 'https://polygon-rpc.com',
      "0x38": import.meta.env.VITE_BSC_RPC || 'https://bsc-dataseed.binance.org'
    },
    defaultChainId: "0x1",
    debug: import.meta.env.DEV || false
  });

  return providerInstance;
}

/**
 * Get the XO Connect Provider instance
 * Throws error if not initialized
 */
export function getXOConnectProvider(): XOConnectProvider {
  if (!providerInstance) {
    throw new Error('XO Connect Provider not initialized. Call initializeXOConnect() first.');
  }
  return providerInstance;
}

/**
 * Reset the provider instance (useful for testing or reconnection)
 */
export function resetXOConnectProvider(): void {
  providerInstance = null;
}

/**
 * Get available currencies from XO Connect client
 */
export async function getAvailableCurrencies() {
  const provider = getXOConnectProvider();
  try {
    const client = await provider.request({ method: 'eth_accounts' });
    return client;
  } catch (error) {
    console.error('Error getting currencies:', error);
    return [];
  }
}
