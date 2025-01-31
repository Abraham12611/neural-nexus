import mongoose from 'mongoose';

export interface IUser {
  privyId: string;
  walletAddress?: string;
  email?: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    privyId: { type: String, required: true, unique: true },
    walletAddress: { type: String, sparse: true },
    email: { type: String, sparse: true },
    name: String,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema); 