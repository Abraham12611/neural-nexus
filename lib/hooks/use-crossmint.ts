'use client';

import { useCrossmintEvents, useCrossmintWallet } from '@crossmint/client-sdk-react-ui';
import { useEffect, useState } from 'react';

export function useCrossmint() {
  const { wallet, connect, disconnect } = useCrossmintWallet();
  const [balance, setBalance] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Listen to Crossmint events
  useCrossmintEvents({
    onConnectSuccess: () => {
      console.log('Wallet connected successfully');
      fetchBalance();
    },
    onConnectError: (error) => {
      console.error('Failed to connect wallet:', error);
      setError('Failed to connect wallet');
    },
    onDisconnectSuccess: () => {
      console.log('Wallet disconnected successfully');
      setBalance('0');
    },
    onDisconnectError: (error) => {
      console.error('Failed to disconnect wallet:', error);
      setError('Failed to disconnect wallet');
    },
  });

  const fetchBalance = async () => {
    if (!wallet?.address) return;

    try {
      setIsLoading(true);
      // TODO: Replace with actual balance fetching from Mantle Network
      const mockBalance = '1000.00';
      setBalance(mockBalance);
      setError(null);
    } catch (err) {
      console.error('Error fetching balance:', err);
      setError('Failed to fetch balance');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (wallet?.address) {
      fetchBalance();
    }
  }, [wallet?.address]);

  return {
    wallet,
    connect,
    disconnect,
    balance,
    isLoading,
    error,
    refreshBalance: fetchBalance,
  };
} 