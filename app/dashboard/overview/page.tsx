'use client';

import { Card } from "@/components/ui/card";
import { AreaChart, DonutChart } from "@tremor/react";

const performanceData = [
  { date: "Jan 01", value: 10000 },
  { date: "Jan 15", value: 11200 },
  { date: "Feb 01", value: 10800 },
  { date: "Feb 15", value: 12400 },
  { date: "Mar 01", value: 13100 },
  { date: "Mar 15", value: 12345.67 },
];

const assetAllocation = [
  { name: "ETH", value: 45 },
  { name: "USDC", value: 30 },
  { name: "MNT", value: 15 },
  { name: "Other", value: 10 },
];

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
            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <p className="text-sm text-green-400">+12.34%</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">24h Change</p>
            <p className="text-2xl font-bold">+$234.56</p>
            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <p className="text-sm text-green-400">+2.34%</p>
            </div>
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
            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <p className="text-sm text-green-400">+1.23% vs market</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6 bg-gray-800 border-gray-700">
          <h3 className="text-lg font-medium mb-4">Portfolio Performance</h3>
          <AreaChart
            className="h-80 mt-4"
            data={performanceData}
            index="date"
            categories={["value"]}
            colors={["yellow"]}
            valueFormatter={(number) => `$${number.toLocaleString()}`}
            showLegend={false}
            yAxisWidth={60}
            showAnimation
            curveType="monotone"
          />
        </Card>
        <Card className="p-6 bg-gray-800 border-gray-700">
          <h3 className="text-lg font-medium mb-4">Asset Allocation</h3>
          <DonutChart
            className="h-80 mt-4"
            data={assetAllocation}
            category="value"
            index="name"
            valueFormatter={(number) => `${number}%`}
            colors={["yellow", "orange", "amber", "yellow-light"]}
            showAnimation
          />
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 bg-gray-800 border-gray-700">
        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Yield Farming Rewards</p>
                  <p className="text-sm text-gray-400">Strategy: USDC-ETH LP</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-400">+$12.34</p>
                <p className="text-sm text-gray-400">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 