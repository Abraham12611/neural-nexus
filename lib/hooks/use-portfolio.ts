'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';

interface Asset {
  token: string;
  symbol: string;
  amount: number;
  value: number;
}

interface PortfolioData {
  totalValue: number;
  assets: Asset[];
  performance: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  history: {
    date: string;
    value: number;
  }[];
}

const MOCK_PORTFOLIO_DATA: PortfolioData = {
  totalValue: 12345.67,
  assets: [
    { token: "ETH", symbol: "ETH", amount: 2.5, value: 5556.05 },
    { token: "USDC", symbol: "USDC", amount: 3700, value: 3700 },
    { token: "MNT", symbol: "MNT", amount: 1500, value: 1850.62 },
    { token: "Other", symbol: "Other", amount: 1239, value: 1239 }
  ],
  performance: {
    daily: 2.34,
    weekly: 5.67,
    monthly: 12.34
  },
  history: [
    { date: "Jan 01", value: 10000 },
    { date: "Jan 15", value: 11200 },
    { date: "Feb 01", value: 10800 },
    { date: "Feb 15", value: 12400 },
    { date: "Mar 01", value: 13100 },
    { date: "Mar 15", value: 12345.67 }
  ]
};

export function usePortfolio() {
  const { address, isConnected } = useAccount();
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPortfolioData() {
      if (!isConnected || !address) {
        setPortfolio(null);
        setIsLoading(false);
        return;
      }

      try {
        // TODO: Replace with actual Mantle Network data fetching
        // For now, using mock data
        setPortfolio(MOCK_PORTFOLIO_DATA);
      } catch (err) {
        console.error('Error fetching portfolio:', err);
        setError('Failed to fetch portfolio data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPortfolioData();
  }, [address, isConnected]);

  const getAssetAllocation = () => {
    if (!portfolio) return [];
    return portfolio.assets.map(asset => ({
      name: asset.symbol,
      value: (asset.value / portfolio.totalValue) * 100
    }));
  };

  const getPerformanceHistory = () => {
    if (!portfolio) return [];
    return portfolio.history;
  };

  return {
    portfolio,
    isLoading,
    error,
    getAssetAllocation,
    getPerformanceHistory
  };
} 