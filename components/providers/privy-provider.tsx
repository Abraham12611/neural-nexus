'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { type ReactNode } from 'react';

export function PrivyAuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  const mantleRpcUrl = process.env.NEXT_PUBLIC_MANTLE_RPC_URL;

  if (!appId) {
    console.error('NEXT_PUBLIC_PRIVY_APP_ID is not set');
    return <div>Configuration Error: Please check environment variables.</div>;
  }

  if (!mantleRpcUrl) {
    console.error('NEXT_PUBLIC_MANTLE_RPC_URL is not set');
    return <div>Configuration Error: Please check environment variables.</div>;
  }

  const mantleChain = {
    id: 5001,
    name: 'Mantle Testnet',
    network: 'mantle-testnet',
    nativeCurrency: {
      name: 'MNT',
      symbol: 'MNT',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: [mantleRpcUrl],
      },
      public: {
        http: [mantleRpcUrl],
      },
    },
    blockExplorers: {
      default: {
        name: 'Mantle Explorer',
        url: 'https://explorer.testnet.mantle.xyz',
      },
    },
    testnet: true,
  };

  return (
    <PrivyProvider
      appId={appId}
      onSuccess={() => router.push('/dashboard')}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'light',
          accentColor: '#F5A524',
          logo: 'https://your-logo-url.com/logo.png',
        },
        embeddedWallets: {
          noPromptOnSignature: true,
        },
        defaultChain: mantleChain,
      }}
    >
      {children}
    </PrivyProvider>
  );
} 