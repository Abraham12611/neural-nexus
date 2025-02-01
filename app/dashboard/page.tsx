'use client';

import { WalletInfo } from "@/components/wallet-info";
import { StrategyRecommendations } from "@/components/strategy-recommendations";

export default function DashboardPage() {
  return (
    <div className="container py-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <WalletInfo />
        <StrategyRecommendations />
        {/* Other dashboard components will go here */}
      </div>
    </div>
  );
} 