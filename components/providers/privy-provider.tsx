'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { type ReactNode } from 'react';

export function PrivyAuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  const mantleRpcUrl = process.env.NEXT_PUBLIC_MANTLE_RPC_URL;

  if (!appId) {
    throw new Error('NEXT_PUBLIC_PRIVY_APP_ID is not set in environment variables');
  }

  if (!mantleRpcUrl) {
    throw new Error('NEXT_PUBLIC_MANTLE_RPC_URL is not set in environment variables');
  }

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
        supportedChains: [
          {
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
          }
        ],
        defaultChain: {
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
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
} 