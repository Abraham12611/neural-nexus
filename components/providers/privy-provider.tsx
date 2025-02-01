'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { type ReactNode } from 'react';
import { appConfig } from '@/lib/config';

export function PrivyAuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const mantleChain = {
    id: appConfig.MANTLE_CHAIN_ID,
    name: 'Mantle Testnet',
    network: 'mantle-testnet',
    nativeCurrency: {
      name: 'MNT',
      symbol: 'MNT',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: [appConfig.MANTLE_RPC_URL],
      },
      public: {
        http: [appConfig.MANTLE_RPC_URL],
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
      appId={appConfig.PRIVY_APP_ID}
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
          createOnLogin: true
        },
        defaultNetwork: mantleChain,
      }}
    >
      {children}
    </PrivyProvider>
  );
} 