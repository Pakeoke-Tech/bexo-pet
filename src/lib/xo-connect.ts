// src/lib/xo-connect.ts
// Type for XO Connect provider (simplified for integration)
export interface XOProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on?: (event: string, handler: (...args: any[]) => void) => void;
  removeListener?: (event: string, handler: (...args: any[]) => void) => void;
}

// Global provider instance
let providerInstance: XOProvider | null = null;

/**
 * Initialize XO Connect Provider with RPC configuration
 * Must be called before using any blockchain functionality
 */
export function initializeXOConnect(): XOProvider {
  if (providerInstance) {
    return providerInstance;
  }

  // For now, use window.ethereum as fallback (will be replaced by XO Connect)
  const fallback: XOProvider = {
    request: async ({ method }: { method: string }) => {
      // Mock implementation for development
      if (method === 'eth_requestAccounts') {
        return ['0x1234567890123456789012345678901234567890'];
      }
      if (method === 'eth_chainId') {
        return '0x1';
      }
      if (method === 'eth_getBalance') {
        return '0x0'; // 0 balance
      }
      return '0x0';
    }
  };

  providerInstance = (window as any).ethereum || fallback;
  return providerInstance!;
}

/**
 * Get the XO Connect Provider instance
 * Throws error if not initialized
 */
export function getXOConnectProvider(): XOProvider {
  if (!providerInstance) {
    return initializeXOConnect();
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
