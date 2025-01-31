'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const { 
    login,
    logout,
    authenticated,
    user,
    ready 
  } = usePrivy();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return {
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: authenticated,
    user,
    isLoading: !ready,
  };
} 