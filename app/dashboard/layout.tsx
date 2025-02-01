'use client';

import { useAuth } from "@/lib/hooks/use-auth";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, LayoutDashboard, PieChart, History, Settings } from "lucide-react";
import { IUser } from "@/types/privy";
import { WalletConnect } from "@/components/wallet-connect";

const navigation = [
  { name: 'Overview', href: '/dashboard/overview', icon: LayoutDashboard },
  { name: 'Portfolio', href: '/dashboard/portfolio', icon: PieChart },
  { name: 'Transactions', href: '/dashboard/transactions', icon: History },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: IUser;
}) {
  const { logout } = useAuth();
  const pathname = usePathname();

  // Get user's email and wallet address safely
  const email = user?.email?.address || user?.email || '';
  const walletAddress = user?.wallet?.address || '';
  const userInitial = email ? email.charAt(0).toUpperCase() : 'U';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="lg:hidden fixed top-4 left-4">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-gray-900 p-0">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="text-xl font-bold">Neural Nexus</h2>
            </div>
            <div className="px-3">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${
                      pathname === item.href ? 'bg-gray-800 text-white' : ''
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-gray-900">
          <div className="flex flex-1 flex-col overflow-y-auto">
            <div className="flex items-center justify-between flex-shrink-0 px-3 py-4">
              <Link href="/dashboard" className="text-xl font-bold text-white">
                Neural Nexus
              </Link>
            </div>
            <Separator />
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${
                      pathname === item.href ? 'bg-gray-800 text-white' : ''
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-bold">Neural Nexus</span>
              {email && <span className="text-sm text-muted-foreground">{email}</span>}
            </div>
            <WalletConnect />
          </div>
        </header>

        {/* Page Content */}
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
} 