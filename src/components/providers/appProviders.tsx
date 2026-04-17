"use client";

import { type ReactNode, useState } from "react";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { ToastProvider } from "@wew/components/ui/toastProvider";
import { AuthProvider } from "@wew/hooks/useAuth";

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            retry: false,
          },
          queries: {
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>{children}</AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
