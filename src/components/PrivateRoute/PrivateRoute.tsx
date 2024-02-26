"use client";

import { useEffect } from 'react';
import Loading from '@/app/loading';
import { useAuth } from '@/contexts/auth';
import { useRouter, usePathname } from 'next/navigation';
import { api } from '@/services/api/axiosConfig';


const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
   const { role, isLoggedIn, loading, logout } = useAuth();
   const router = useRouter();
   const pathname = usePathname();




   useEffect(() => {
      // const handleForbiddenError = (error: any) => {
      //    if (error.response && error.response.status === 403) {
      //       // Token expirado, redirecione para a página de login
      //       router.push("/");
      //    }
      // };

      console.log("Entrou no private Route")

 
      if (!isLoggedIn) {
         console.log("Usuário não logado")
         router.push("/");
      } else if (role === 'user' && pathname === '/admin') {
         console.log("User tentando acessar admin");
         router.replace('/user');
      } else if (role === 'admin' && pathname === '/user') {
         console.log('Admin tentando acessar user');
         router.replace('/admin');
      }

      // Adicione um interceptor para tratar erros de token expirado
      // const axiosInterceptor = api.interceptors.response.use(
      //    (response) => response,
      //    (error) => {
      //       handleForbiddenError(error);
      //       throw error;
      //    }
      // );

      // return () => {
      //    // Remova o interceptor ao desmontar o componente
      //    api.interceptors.response.eject(axiosInterceptor);
      // };
   }, [isLoggedIn, role, pathname, router, logout]);


   return children;
};

export default PrivateRoute;