import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { cookieStorage, createStorage } from "wagmi";
import { mantle, mantleSepoliaTestnet } from '@reown/appkit/networks'

// TESTING ONLY - DO NOT USE IN PRODUCTION
export const appConfig = {
  // Auth
  PRIVY_APP_ID: 'cm6j660yx03lsdvpnu3a2mlkm',

  // Mantle Network
  PROJECT_ID: '999e6495c91be36a67260869b0792117',
  MANTLE_RPC_URL: 'https://rpc.testnet.mantle.xyz',
  MANTLE_CHAIN_ID: 5001,

  // MongoDB
  MONGODB_URI: 'mongodb+srv://abrahamdahunsi:test_password_123@cluster0.3vgfg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',

  // Crossmint
  CROSSMINT_CLIENT_ID: 'page',
  CROSSMINT_PROJECT_ID: '5eaee537-af08-4178-845c-1502b1f51378',
  CROSSMINT_ENVIRONMENT: 'staging',

  // L2 Contract Addresses (Mantle Testnet)
  L2_BRIDGE: '0x4200000000000000000000000000000000000010',
  L2_CDM: '0x4200000000000000000000000000000000000007',
  L2_MNT: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'
} as const;

// Get projectId from https://cloud.reown.com
export const projectId = appConfig.PROJECT_ID;
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

// TESTING ONLY - DO NOT USE IN PRODUCTION
export const config = {
  // Auth
  PRIVY_APP_ID: 'cm6j660yx03lsdvpnu3a2mlkm',

  // Mantle Network
  PROJECT_ID: '999e6495c91be36a67260869b0792117',
  MANTLE_RPC_URL: 'https://rpc.testnet.mantle.xyz',
  MANTLE_CHAIN_ID: 5001,

  // MongoDB
  MONGODB_URI: 'mongodb+srv://abrahamdahunsi:test_password_123@cluster0.3vgfg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',

  // Crossmint
  CROSSMINT_CLIENT_ID: 'page',
  CROSSMINT_PROJECT_ID: '5eaee537-af08-4178-845c-1502b1f51378',
  CROSSMINT_ENVIRONMENT: 'staging',

  // L2 Contract Addresses (Mantle Testnet)
  L2_BRIDGE: '0x4200000000000000000000000000000000000010',
  L2_CDM: '0x4200000000000000000000000000000000000007',
  L2_MNT: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000'
} as const; 