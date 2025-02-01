'use client';

import { useCrossmint as useCrossmintBase } from '@crossmint/client-sdk-react-ui';
import { useEffect, useState } from 'react';

export function useCrossmint() {
  const { wallet, connect, disconnect } = useCrossmintBase();
  const [balance, setBalance] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (wallet?.address) {
      fetchBalance();
    }
  }, [wallet?.address]);

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

  // Handle wallet events
  useEffect(() => {
    const handleConnect = () => {
      console.log('Wallet connected successfully');
      fetchBalance();
    };

    const handleDisconnect = () => {
      console.log('Wallet disconnected successfully');
      setBalance('0');
    };

    const handleError = (err: Error) => {
      console.error('Wallet error:', err);
      setError(err.message);
    };

    // Add event listeners
    window.addEventListener('crossmint_connectSuccess', handleConnect);
    window.addEventListener('crossmint_disconnectSuccess', handleDisconnect);
    window.addEventListener('crossmint_error', handleError as EventListener);

    return () => {
      // Remove event listeners
      window.removeEventListener('crossmint_connectSuccess', handleConnect);
      window.removeEventListener('crossmint_disconnectSuccess', handleDisconnect);
      window.removeEventListener('crossmint_error', handleError as EventListener);
    };
  }, []);

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