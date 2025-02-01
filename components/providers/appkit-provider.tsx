'use client'

import { AppkitProvider } from "@reown/appkit-react";
import { wagmiAdapter, projectId, metadata, wagmiConfig } from '@/lib/config'
import { mantle, mantleSepoliaTestnet } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import { type State } from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mantle, mantleSepoliaTestnet],
  metadata,
  features: {
    analytics: true,
  },
  themeMode: 'light'
})

export function AppkitClientProvider({ children, initialState }: { children: ReactNode, initialState?: State }) {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <AppkitProvider adapter={wagmiAdapter} projectId={projectId} metadata={metadata}>
          {children}
        </AppkitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
} 