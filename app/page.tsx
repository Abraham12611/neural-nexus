'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/hooks/use-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push('/dashboard/overview');
    } else {
      login();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
            Neural Nexus
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
            AI-Powered DeFi Yield Optimization on Mantle Network
          </p>
          <div className="flex gap-4">
            <Button
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold h-12 px-6"
              variant="default"
              onClick={handleGetStarted}
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
            </Button>
            <Button 
              variant="outline"
              className="h-12 px-6"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose Neural Nexus?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 bg-gray-800 border-gray-700">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">AI-Powered Strategies</h3>
              <p className="text-gray-400">
                Advanced algorithms optimize your yield farming strategies in real-time
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gray-800 border-gray-700">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Secure & Non-Custodial</h3>
              <p className="text-gray-400">
                Your assets always remain under your control with our non-custodial solution
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gray-800 border-gray-700">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Real-Time Analytics</h3>
              <p className="text-gray-400">
                Track your portfolio performance and strategy insights in real-time
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Optimize Your DeFi Yields?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join Neural Nexus today and experience the future of DeFi yield optimization.
          </p>
          <Button
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold h-12 px-6"
            variant="default"
            onClick={handleGetStarted}
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Start Now'}
          </Button>
        </div>
      </div>
    </div>
  );
}
