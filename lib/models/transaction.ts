import mongoose from 'mongoose';
import { IUser } from './user';

export interface ITransaction {
  userId: IUser['_id'];
  type: 'deposit' | 'withdraw' | 'yield' | 'swap';
  status: 'pending' | 'completed' | 'failed';
  amount: number;
  token: string;
  txHash?: string;
  strategy?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new mongoose.Schema<ITransaction>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['deposit', 'withdraw', 'yield', 'swap'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    amount: { type: Number, required: true },
    token: { type: String, required: true },
    txHash: String,
    strategy: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

export const Transaction = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', transactionSchema); 