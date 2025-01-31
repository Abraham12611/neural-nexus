import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { cookieStorage, createStorage } from "wagmi";
import { mantle, mantleSepoliaTestnet } from '@reown/appkit/networks'

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

export const networks = [mantle, mantleSepoliaTestnet]

if (!projectId) throw new Error("Project ID is not defined");

// Set up the Wagmi Adapter (config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  networks,
  projectId
})

export const config = wagmiAdapter.wagmiConfig

// App metadata
export const metadata = {
  name: "Neural Nexus",
  description: "AI-Powered DeFi Yield Optimization on Mantle Network",
  url: "https://neuralnexus.app", // Update this with your actual domain
  icons: ["https://neuralnexus.app/icon.png"] // Update with your actual icon
} 