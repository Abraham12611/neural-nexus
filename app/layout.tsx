import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import { headers } from "next/headers";
import { AppKitProvider } from "@/components/providers/appkit-provider";
import { PrivyAuthProvider } from "@/components/providers/privy-provider";
import { CrossmintProvider } from "@/components/providers/crossmint-provider";

export const metadata: Metadata = {
  title: "Neural Nexus - AI-Powered DeFi Yield Optimization",
  description: "Optimize your DeFi yields with AI-powered strategies on Mantle Network",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const cookies = headersList.get("cookie");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-inter">
        <PrivyAuthProvider>
          <CrossmintProvider>
            <AppKitProvider cookies={cookies}>{children}</AppKitProvider>
          </CrossmintProvider>
        </PrivyAuthProvider>
      </body>
    </html>
  );
}
