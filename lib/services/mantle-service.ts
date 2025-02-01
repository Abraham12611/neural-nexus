import { ethers } from 'ethers';
import { CrossChainMessenger } from '@mantleio/sdk';

export class MantleService {
  private provider: ethers.providers.Web3Provider;
  private crossChainMessenger: CrossChainMessenger;

  constructor() {
    if (typeof window !== 'undefined') {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }

  async init() {
    if (!this.provider) return;

    this.crossChainMessenger = new CrossChainMessenger({
      l1ChainId: Number(process.env.NEXT_PUBLIC_L1_CHAIN_ID), // Ethereum Mainnet or Testnet
      l2ChainId: Number(process.env.NEXT_PUBLIC_L2_CHAIN_ID), // Mantle Mainnet or Testnet
      l1SignerOrProvider: this.provider,
      l2SignerOrProvider: this.provider,
    });
  }

  async executeStrategy(poolId: string, amount: string) {
    if (!this.provider || !this.crossChainMessenger) {
      throw new Error('Provider not initialized');
    }

    try {
      const signer = this.provider.getSigner();
      const address = await signer.getAddress();

      // Convert amount to Wei
      const amountInWei = ethers.utils.parseEther(amount);

      // Create transaction
      const tx = {
        to: poolId, // Pool contract address
        value: amountInWei,
        from: address,
      };

      // Send transaction
      const txResponse = await signer.sendTransaction(tx);
      
      // Wait for confirmation
      const receipt = await txResponse.wait();

      return {
        success: true,
        hash: receipt.transactionHash,
      };
    } catch (error) {
      console.error('Error executing strategy:', error);
      throw error;
    }
  }

  async getTransactionStatus(hash: string) {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    try {
      const tx = await this.provider.getTransaction(hash);
      if (!tx) return 'not_found';

      const receipt = await this.provider.getTransactionReceipt(hash);
      if (!receipt) return 'pending';

      return receipt.status === 1 ? 'success' : 'failed';
    } catch (error) {
      console.error('Error getting transaction status:', error);
      throw error;
    }
  }
} 