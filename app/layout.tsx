import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import { AppKitProvider } from "@/components/providers/appkit-provider";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <AppKitProvider cookies={cookies}>{children}</AppKitProvider>
      </body>
    </html>
  );
}
