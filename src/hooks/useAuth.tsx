// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// interface User {
//   id: number;
//   name: string;
//   login: string;
//   role: string;
//   cargo: string;
// }

// interface Auth {
//   isLoggedIn: boolean;
//   user: User | null;
//   login: (token: string, userData: User) => void;
//   logout: () => void;
// }

// const saveUserToSessionStorage = (token: string, userData: User) => { 
//   sessionStorage.setItem('token', token);
//   sessionStorage.setItem('user', JSON.stringify(userData));
//   sessionStorage.setItem('isLoggedIn', 'true');
//   console.log("Salvou")
// };

// export const useAuth = (): Auth => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState<User | null>(null);

//   const loadUserFromSessionStorage = () => {
//     const storedUser = sessionStorage.getItem('user');
//     const storedToken = sessionStorage.getItem('token');
//     const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn');

//     if (storedUser && storedToken && storedIsLoggedIn === 'true') {
//       setIsLoggedIn(true);
//       setUser(JSON.parse(storedUser));
//     }
//   };

//   useEffect(() => {
//     console.log("Entrou no useEffect do load")
//     loadUserFromSessionStorage();
//   }, []);

//   useEffect(() => {
//     console.log("entrou no useEffect do window")
//     window.addEventListener('storage', loadUserFromSessionStorage);
//     return () => {
//       window.removeEventListener('storage', loadUserFromSessionStorage);
//     };
//   }, []);

//   const login = (token: string, userData: User) => {
//     console.log("entrou no login")
//     setIsLoggedIn(true);
//     setUser(userData);
//     saveUserToSessionStorage(token, userData);
//   };

//   const logout = () => {
//     console.log("Entrou no logout");
//     setIsLoggedIn(false);
//     setUser(null);
//     clearSessionStorage();
//     // Aguarde um momento antes de redirecionar para a página de login
//     setTimeout(() => {
//       router.replace('/'); // Redirecione para a página de login após o logout
//     }, 0);
//   };

//   const clearSessionStorage = () => {
//     console.log("Entrou no clearSessionStorage")
//     sessionStorage.removeItem('token');
//     sessionStorage.removeItem('user');
//     sessionStorage.removeItem('isLoggedIn');
//   };

//   return { isLoggedIn, user, login, logout };
// };
