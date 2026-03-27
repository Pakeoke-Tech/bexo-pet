// src/hooks/useXOConnect.ts
import { useState, useCallback, useEffect } from 'react';
import { useGameStore } from '../stores/gameStore';
import { getXOConnectProvider, initializeXOConnect } from '../lib/xo-connect';

export function useXOConnect() {
  const [error, setError] = useState<Error | null>(null);
  const { setWallet, setWalletBalance, updatePoints, disconnectWallet } = useGameStore();

  const connect = useCallback(async () => {
    try {
      setError(null);

      // Initialize XO Connect provider
      const provider = initializeXOConnect();

      // Request account access using eth_requestAccounts
      const accounts = await provider.request({
        method: 'eth_requestAccounts'
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No se obtuvieron cuentas de XO Connect');
      }

      // Get chain ID using eth_chainId
      const chainId = await provider.request({
        method: 'eth_chainId'
      });

      setWallet(accounts[0], chainId);

      // Get balance using eth_getBalance
      const balance = await provider.request({
        method: 'eth_getBalance',
        params: [accounts[0], 'latest']
      });

      setWalletBalance(balance);

      // DEMO: Set initial points for hackathon demo
      // Balance Points: calculated from wallet balance (balance * 5)
      // Rare Points: 10,000 for demo (allows buying tier 3-4 skins)
      const balanceInWei = BigInt(balance);
      const balancePoints = Number(balanceInWei) * 5;
      const demoRarePoints = 10000; // 10K Rare Points para demo

      updatePoints(balancePoints, demoRarePoints);

    } catch (err: any) {
      console.error('Error connecting wallet:', err);

      // Handle specific error codes
      if (err.code === 4001) {
        setError(new Error('Conexión rechazada por el usuario'));
      } else if (err.code === -32002) {
        setError(new Error('Ya hay una petición pendiente en Bexo Wallet'));
      } else {
        setError(err);
      }
    }
  }, [setWallet, setWalletBalance, updatePoints]);

  const disconnect = useCallback(() => {
    disconnectWallet();
    setError(null);
  }, [disconnectWallet]);

  // Listen for account/chain changes using XO Connect events
  useEffect(() => {
    let provider: any;

    try {
      provider = getXOConnectProvider();
    } catch {
      // Provider not initialized yet
      return;
    }

    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected wallet
        disconnect();
      } else if (accounts[0] !== useGameStore.getState().address) {
        // User switched accounts
        setWallet(accounts[0], useGameStore.getState().chainId!);

        // Get new balance for switched account
        try {
          const balance = await provider.request({
            method: 'eth_getBalance',
            params: [accounts[0], 'latest']
          });
          setWalletBalance(balance);

          // Recalculate points for new account
          const balanceInWei = BigInt(balance);
          const balancePoints = Number(balanceInWei) * 5;
          updatePoints(balancePoints, 10000); // Keep demo rare points
        } catch (error) {
          console.error('Error getting balance for switched account:', error);
        }
      }
    };

    const handleChainChanged = (chainId: string) => {
      // User switched networks
      setWallet(useGameStore.getState().address!, chainId);
    };

    const handleDisconnect = (error: { code: number; message: string }) => {
      console.log('XO Connect disconnect:', error);
      disconnect();
    };

    // Subscribe to XO Connect events
    provider.on?.('accountsChanged', handleAccountsChanged);
    provider.on?.('chainChanged', handleChainChanged);
    provider.on?.('disconnect', handleDisconnect);

    // Cleanup on unmount
    return () => {
      provider.removeListener?.('accountsChanged', handleAccountsChanged);
      provider.removeListener?.('chainChanged', handleChainChanged);
      provider.removeListener?.('disconnect', handleDisconnect);
    };
  }, [setWallet, setWalletBalance, updatePoints, disconnect]);

  return {
    isConnected: useGameStore(state => state.isConnected),
    address: useGameStore(state => state.address),
    chainId: useGameStore(state => state.chainId),
    walletBalance: useGameStore(state => state.walletBalance),
    connect,
    disconnect,
    error
  };
}
