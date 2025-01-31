'use client';

import { Card } from "@/components/ui/card";

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to Neural Nexus. Here's an overview of your portfolio.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Total Portfolio Value</p>
            <p className="text-2xl font-bold">$12,345.67</p>
            <p className="text-sm text-green-400">+12.34%</p>
          </div>
        </Card>
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">24h Change</p>
            <p className="text-2xl font-bold">+$234.56</p>
            <p className="text-sm text-green-400">+2.34%</p>
          </div>
        </Card>
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Active Strategies</p>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-gray-400">of 5 available</p>
          </div>
        </Card>
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Total Yield (APY)</p>
            <p className="text-2xl font-bold">15.67%</p>
            <p className="text-sm text-green-400">+1.23% vs market</p>
          </div>
        </Card>
      </div>

      {/* Placeholder for charts and other components */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6 bg-gray-800 border-gray-700 h-[400px]">
          <h3 className="text-lg font-medium mb-4">Portfolio Performance</h3>
          <div className="flex items-center justify-center h-full text-gray-400">
            Chart placeholder
          </div>
        </Card>
        <Card className="p-6 bg-gray-800 border-gray-700 h-[400px]">
          <h3 className="text-lg font-medium mb-4">Asset Allocation</h3>
          <div className="flex items-center justify-center h-full text-gray-400">
            Chart placeholder
          </div>
        </Card>
      </div>
    </div>
  );
} 