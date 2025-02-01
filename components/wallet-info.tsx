'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCrossmint } from "@/lib/hooks/use-crossmint";
import { Skeleton } from "@/components/ui/skeleton";

export function WalletInfo() {
  const { wallet, balance, isLoading, error } = useCrossmint();

  if (!wallet?.address) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Address</p>
          <p className="mt-1 font-mono">
            {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Balance</p>
          {isLoading ? (
            <Skeleton className="h-6 w-24 mt-1" />
          ) : error ? (
            <p className="mt-1 text-red-500">Error loading balance</p>
          ) : (
            <p className="mt-1">{balance} MNT</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 