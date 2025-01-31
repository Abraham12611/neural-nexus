'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { type ReactNode } from 'react';

export function PrivyAuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      onSuccess={() => router.push('/dashboard')}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'light',
          accentColor: '#F5A524',
          logo: 'https://your-logo-url.com/logo.png',
        },
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
              http: [process.env.NEXT_PUBLIC_MANTLE_RPC_URL!],
            },
            public: {
              http: [process.env.NEXT_PUBLIC_MANTLE_RPC_URL!],
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