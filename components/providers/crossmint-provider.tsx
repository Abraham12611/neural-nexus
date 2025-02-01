'use client';

import { CrossmintProvider as Provider } from "@crossmint/client-sdk-react-ui";
import { ReactNode } from "react";

export function CrossmintProvider({ children }: { children: ReactNode }) {
  return (
    <Provider
      projectId={process.env.NEXT_PUBLIC_CROSSMINT_PROJECT_ID!}
      environment="staging" // Change to "production" for mainnet
    >
      {children}
    </Provider>
  );
} 