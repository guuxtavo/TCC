// Importe os módulos necessários
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';

// Crie uma instância do Axios
const api = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL_BASE,
   headers: {
      'Content-Type': 'application/json',
   },
});

// Adicione um interceptor para as respostas do Axios
api.interceptors.response.use(
   (response) => {
      // Verifique se há um cabeçalho X-New-Token na resposta
      const newToken = response.headers['x-new-token'];

      // Se houver, atualize o token no estado do AuthContext
      if (newToken) {
         // const { updateToken } = useAuth();
         // updateToken(newToken);
      }

      return response;
   },
   (error) => {
      // Trate erros de requisição aqui, se necessário
      return Promise.reject(error);
   }
);

// Exporte a instância do Axios
export { api };
