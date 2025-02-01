'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AIStrategy } from "@/lib/services/ai-strategy";
import { useMantle } from "@/lib/hooks/use-mantle";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function StrategyRecommendations() {
  const [riskPreference, setRiskPreference] = useState<'low' | 'medium' | 'high'>('medium');
  const [selectedPool, setSelectedPool] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  
  const aiStrategy = new AIStrategy();
  const strategies = aiStrategy.getStrategies(riskPreference);
  const { executeStrategy, hasPendingTransactions } = useMantle();

  const handleExecute = async (poolId: string, amount: string) => {
    try {
      setIsExecuting(true);
      await executeStrategy(poolId, amount);
      setSelectedPool(null);
      setAmount('');
    } catch (error) {
      console.error('Error executing strategy:', error);
    } finally {
      setIsExecuting(false);
    }
  };

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
              <div className="mt-4 flex justify-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="secondary"
                      onClick={() => setSelectedPool(strategy.pool.id)}
                      disabled={isExecuting || hasPendingTransactions}
                    >
                      {isExecuting && selectedPool === strategy.pool.id ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Executing...
                        </>
                      ) : (
                        'Execute Strategy'
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Execute Strategy</DialogTitle>
                      <DialogDescription>
                        Enter the amount you want to invest in {strategy.pool.name}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Input
                          id="amount"
                          placeholder="Enter amount"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={() => handleExecute(strategy.pool.id, amount)}
                        disabled={!amount || isExecuting}
                      >
                        {isExecuting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Executing...
                          </>
                        ) : (
                          'Confirm'
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 