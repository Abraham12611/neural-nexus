'use client';

import { useState, useEffect } from 'react';
import { MantleService } from '../services/mantle-service';
import { toast } from '@/hooks/use-toast';

export function useMantle() {
  const [mantleService, setMantleService] = useState<MantleService | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [pendingTransactions, setPendingTransactions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const service = new MantleService();
    service.init().then(() => {
      setMantleService(service);
      setIsInitializing(false);
    }).catch((error) => {
      console.error('Failed to initialize Mantle service:', error);
      toast({
        title: 'Error',
        description: 'Failed to initialize Mantle Network connection',
        variant: 'destructive',
      });
      setIsInitializing(false);
    });
  }, []);

  const executeStrategy = async (poolId: string, amount: string) => {
    if (!mantleService) {
      throw new Error('Mantle service not initialized');
    }

    try {
      const result = await mantleService.executeStrategy(poolId, amount);
      setPendingTransactions(prev => ({ ...prev, [result.hash]: true }));
      
      toast({
        title: 'Strategy Execution Started',
        description: 'Your transaction has been submitted to the network',
      });

      // Start monitoring the transaction
      monitorTransaction(result.hash);
      
      return result;
    } catch (error) {
      console.error('Error executing strategy:', error);
      toast({
        title: 'Error',
        description: 'Failed to execute strategy',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const monitorTransaction = async (hash: string) => {
    if (!mantleService) return;

    try {
      const status = await mantleService.getTransactionStatus(hash);
      
      if (status === 'success') {
        setPendingTransactions(prev => {
          const next = { ...prev };
          delete next[hash];
          return next;
        });
        
        toast({
          title: 'Transaction Successful',
          description: 'Your strategy has been executed successfully',
        });
      } else if (status === 'failed') {
        setPendingTransactions(prev => {
          const next = { ...prev };
          delete next[hash];
          return next;
        });
        
        toast({
          title: 'Transaction Failed',
          description: 'Strategy execution failed',
          variant: 'destructive',
        });
      } else if (status === 'pending') {
        // Check again in 5 seconds
        setTimeout(() => monitorTransaction(hash), 5000);
      }
    } catch (error) {
      console.error('Error monitoring transaction:', error);
    }
  };

  return {
    executeStrategy,
    isInitializing,
    hasPendingTransactions: Object.keys(pendingTransactions).length > 0,
    pendingTransactions,
  };
} 