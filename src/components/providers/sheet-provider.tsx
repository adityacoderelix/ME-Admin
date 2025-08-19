"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
const queryClient = new QueryClient();
interface TanstackProviderProps {
  children: React.ReactNode;
}
// Create a client
export const TanstackProvider = ({ children }: TanstackProviderProps) => {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
