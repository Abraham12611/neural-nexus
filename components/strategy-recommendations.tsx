'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIStrategy } from "@/lib/services/ai-strategy";
import { useState } from "react";

export function StrategyRecommendations() {
  const [riskPreference, setRiskPreference] = useState<'low' | 'medium' | 'high'>('medium');
  const aiStrategy = new AIStrategy();
  const strategies = aiStrategy.getStrategies(riskPreference);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>AI Strategy Recommendations</CardTitle>
          <Select
            value={riskPreference}
            onValueChange={(value) => setRiskPreference(value as 'low' | 'medium' | 'high')}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select risk level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {strategies.map((strategy) => (
            <div key={strategy.pool.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{strategy.pool.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Risk Level: {strategy.riskLevel} | Confidence: {strategy.confidence}%
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{strategy.expectedReturn}% APY</p>
                  <p className="text-sm text-muted-foreground">
                    Recommended: {strategy.recommendedAllocation}%
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">TVL</p>
                  <p className="font-medium">${strategy.pool.tvl.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">24h Volume</p>
                  <p className="font-medium">${strategy.pool.volume24h.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Current APY</p>
                  <p className="font-medium">{strategy.pool.apy}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 