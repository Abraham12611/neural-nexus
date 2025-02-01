'use client';

import { useState, useEffect } from 'react';
import { AIStrategy } from '@/lib/services/ai-strategy';

export function useAIStrategy(riskPreference: 'conservative' | 'moderate' | 'aggressive' = 'moderate') {
  const [aiStrategy] = useState(() => new AIStrategy());
  const [strategies, setStrategies] = useState<ReturnType<typeof aiStrategy.getStrategies>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const recommendedStrategies = aiStrategy.getStrategies(riskPreference);
      setStrategies(recommendedStrategies);
      setError(null);
    } catch (err) {
      console.error('Error getting AI strategies:', err);
      setError('Failed to get strategy recommendations');
    } finally {
      setIsLoading(false);
    }
  }, [aiStrategy, riskPreference]);

  const analyzePool = (poolId: string) => {
    try {
      return aiStrategy.analyzePool(poolId);
    } catch (err) {
      console.error('Error analyzing pool:', err);
      return null;
    }
  };

  const getAllPools = () => {
    try {
      return aiStrategy.getPools();
    } catch (err) {
      console.error('Error getting pools:', err);
      return [];
    }
  };

  return {
    strategies,
    isLoading,
    error,
    analyzePool,
    getAllPools,
  };
} 