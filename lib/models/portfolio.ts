import mongoose from 'mongoose';
import { IUser } from './user';

export interface IPortfolio {
  userId: IUser['_id'];
  totalValue: number;
  assets: {
    token: string;
    amount: number;
    value: number;
  }[];
  strategies: {
    name: string;
    type: 'yield-farming' | 'lending' | 'staking';
    apy: number;
    tvl: number;
    invested: number;
  }[];
  performance: {
    daily: number;
    weekly: number;
    monthly: number;
    total: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const portfolioSchema = new mongoose.Schema<IPortfolio>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalValue: { type: Number, default: 0 },
    assets: [{
      token: String,
      amount: Number,
      value: Number,
    }],
    strategies: [{
      name: String,
      type: {
        type: String,
        enum: ['yield-farming', 'lending', 'staking'],
      },
      apy: Number,
      tvl: Number,
      invested: Number,
    }],
    performance: {
      daily: { type: Number, default: 0 },
      weekly: { type: Number, default: 0 },
      monthly: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

export const Portfolio = mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', portfolioSchema); 