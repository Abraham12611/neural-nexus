export interface IUser {
  id: string;
  email?: {
    address: string;
    verified: boolean;
  };
  wallet?: {
    address: string;
    chainId: number;
  };
} 