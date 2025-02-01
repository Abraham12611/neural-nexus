'use client';

import { Button } from "@/components/ui/button";
import { useCrossmint } from "@/lib/hooks/use-crossmint";
import { Loader2 } from "lucide-react";

export function WalletConnect() {
  const { wallet, connect, disconnect, isLoading, error } = useCrossmint();

  if (isLoading) {
    return (
      <Button disabled variant="outline">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Connecting...
      </Button>
    );
  }

  if (error) {
    return (
      <Button variant="destructive" onClick={connect}>
        Error - Try Again
      </Button>
    );
  }

  if (wallet?.address) {
    return (
      <Button variant="outline" onClick={disconnect}>
        Disconnect {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
      </Button>
    );
  }

  return (
    <Button onClick={connect}>
      Connect Wallet
    </Button>
  );
} 