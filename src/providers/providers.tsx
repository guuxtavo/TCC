"use client"

import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import { AuthProvider } from "@/contexts/auth";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
   return (

      <AuthProvider>
         <PrivateRoute>
            <QueryClientProvider client={queryClient} >

               {children}
            </QueryClientProvider>

         </PrivateRoute>
      </AuthProvider>

   )
}; 