"use client"

import { User } from "@/types/User";
import { useCallback, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useRouter } from 'next/navigation';
import { api } from "@/services/api/axiosConfig";
import jwt from 'jsonwebtoken';

const LOCAL_STORAGE_KEY__USER_NOME = 'APP_USER_NAME'
const LOCAL_STORAGE_KEY__USER_LOGIN = 'APP_USER_LOGIN'
const LOCAL_STORAGE_KEY__USER_ID = 'APP_USER_ID'
const LOCAL_STORAGE_KEY__TYPE_ROLE = 'APP_TYPE_ROLE'
const LOCAL_STORAGE_KEY__CARGO = 'ACCESS_CARGO'
const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN'
const LOCAL_STORAGE_KEY__FIRST_ACCESS = 'APP_FIRST_ACCESS'


type AuthContextProps = {
   tokenExpiration: number | undefined,
   token: string | undefined ,
   nome: string | undefined ,
   id: number | undefined,
   cargo: string | undefined ,
   role: string | undefined ,
   login: string | undefined,
   isLoggedIn: boolean,
   isFirstAccess: boolean | undefined,
   loading: boolean,
   handleLogin: (user: User, token: string) => void;
   logout: () => void
}

// criação do contexto
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);


const AuthProvider = ({ children }: { children: React.ReactNode }) => {

   // const updateToken = (newToken: string) => {
   //    setToken(newToken);
   //    // Além de atualizar o estado, você pode salvar o novo token no armazenamento local, se necessário
   //    localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, newToken);
   // };

   // const [user, setUser] = useState<User | null>(null);
   const router = useRouter();
   const [ isFirstAccess, setIsFirstAccess] = useState<boolean | undefined>(false);
   const [isLoggedIn, setIsloggedin] = useState(false)
   const [token, setToken] = useState<string | undefined>("")
   const [tokenExpiration, setTokenExpiration] = useState<number | undefined>();
   const [nome, setNome] = useState<string | undefined>("");
   const [id, setId] = useState<number>();
   const [cargo, setCargo] = useState<string | undefined>("");
   const [role, setRole] = useState<string | undefined>("");
   const [login, setLogin] = useState<string | undefined>("");
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const name = localStorage.getItem(LOCAL_STORAGE_KEY__USER_NOME)
      const idUser = localStorage.getItem(LOCAL_STORAGE_KEY__USER_ID)
      const cargo = localStorage.getItem(LOCAL_STORAGE_KEY__CARGO)
      const role = localStorage.getItem(LOCAL_STORAGE_KEY__TYPE_ROLE)
      const login = localStorage.getItem(LOCAL_STORAGE_KEY__USER_LOGIN)
      const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN)
      const isFirstAccess = localStorage.getItem(LOCAL_STORAGE_KEY__FIRST_ACCESS)

      if (accessToken && name && cargo && role && idUser && role && login && isFirstAccess) {
         api.defaults.headers.Authorization = `Bearer ${accessToken}`

         setId(Number(JSON.parse(idUser)))
         setToken(accessToken)
         setNome(JSON.parse(name))
         setCargo(JSON.parse(cargo))
         setRole(JSON.parse(role))
         setLogin(JSON.parse(login))
         setIsFirstAccess(JSON.parse(isFirstAccess))
         setIsloggedin(true);

         const decodedToken: any = jwt.decode(accessToken, { complete: true });
         const tokenExpiration = decodedToken?.payload?.exp;
         console.log("Token: " + accessToken + "e token expiration: " + tokenExpiration)
         setTokenExpiration(tokenExpiration)


      } else {
         setId(undefined)
         setToken(undefined)
         setNome(undefined)
         setCargo(undefined)
         setRole(undefined)
         setLogin(undefined)
      }

      setLoading(false)
   }, []);

   
   const logout = () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_KEY__USER_ID);
      localStorage.removeItem(LOCAL_STORAGE_KEY__USER_NOME);
      localStorage.removeItem(LOCAL_STORAGE_KEY__USER_LOGIN);
      localStorage.removeItem(LOCAL_STORAGE_KEY__TYPE_ROLE);
      localStorage.removeItem(LOCAL_STORAGE_KEY__CARGO);
      localStorage.removeItem(LOCAL_STORAGE_KEY__FIRST_ACCESS)
   
      setId(undefined);
      setToken(undefined);
      setNome(undefined);
      setCargo(undefined);
      setRole(undefined);
      setLogin(undefined);
      setIsloggedin(false);
      api.defaults.headers.Authorization = null;
      router.push("/")

   };


   const handleLogin = useCallback(async (user: User, token: string) => {


      localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, token)
      localStorage.setItem(LOCAL_STORAGE_KEY__USER_ID, JSON.stringify(user.id))
      localStorage.setItem(LOCAL_STORAGE_KEY__USER_NOME, JSON.stringify(user.nome))
      localStorage.setItem(LOCAL_STORAGE_KEY__USER_LOGIN, JSON.stringify(user.login))
      localStorage.setItem(LOCAL_STORAGE_KEY__TYPE_ROLE, JSON.stringify(user.role))
      localStorage.setItem(LOCAL_STORAGE_KEY__CARGO, JSON.stringify(user.cargo))
      localStorage.setItem(LOCAL_STORAGE_KEY__FIRST_ACCESS, JSON.stringify(user.primeiroAcesso))

      api.defaults.headers.Authorization = `Bearer ${token}`

      setId(user.id);
      setToken(token);
      setNome(user.nome);
      setCargo(user.cargo);
      setRole(user.role);
      setLogin(user.login);
      setIsFirstAccess(user.primeiroAcesso)
      setIsloggedin(true);

   }, []);

   return (
      <AuthContext.Provider
         value={{
            id,
            nome,
            login,
            token,
            tokenExpiration,
            cargo,
            role,
            isLoggedIn,
            isFirstAccess,
            loading,
            handleLogin,
            logout
         }}>

         <>{children}</>
      </AuthContext.Provider>
   )
};

const useAuth = () => {
   const context = useContext(AuthContext);
   return context;
}


export { AuthProvider, AuthContext, useAuth }








// "use client";

// import { User } from "@/types/User";
// import { useCallback, useContext, useEffect, useState } from "react";
// import { createContext } from "react";
// import { useRouter } from 'next/navigation';
// import { api } from "@/services/api/axiosConfig";

// // Objeto com as chaves do armazenamento local
// const LOCAL_STORAGE_KEYS = {
//   USER: 'APP_USER',
//   ACCESS_TOKEN: 'APP_ACCESS_TOKEN',
// };

// type AuthContextProps = {
//    user: User | undefined,
//    token: string | undefined,
//    isLoggedIn: boolean,
//    loading: boolean,
//    handleLogin: (user: User, token: string) => void;
//    logout: () => void;
// }

// // criação do contexto
// const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

// const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//    const router = useRouter();
//    const [isLoggedIn, setIsloggedin] = useState(false)
//    const [token, setToken] = useState<string | undefined>("");
//    const [user, setUser] = useState<User | undefined>();
//    const [loading, setLoading] = useState(true);

//    useEffect(() => {
//       const loadLocalStorage = () => {
//          const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
//          const storedToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

//          return { storedUser, storedToken };
//       };

//       const { storedUser, storedToken } = loadLocalStorage();

//       if (storedToken && storedUser) {
//          const parsedUser = JSON.parse(storedUser) as User;

//          api.defaults.headers.Authorization = `Bearer ${storedToken}`;

//          setUser(parsedUser);
//          setToken(storedToken);
//          setIsloggedin(true);
//       }

//       setLoading(false);
//    }, []);

//    const logout = () => {
//       localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
//       localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
   
//       setUser(undefined);
//       setToken(undefined);
//       setIsloggedin(false);
//       api.defaults.headers.Authorization = null;
//       router.push("/");
//    };

//    const handleLogin = useCallback(async (user: User, token: string) => {
//       const userData = {
//          id: user.id,
//          nome: user.nome,
//          login: user.login,
//          role: user.role,
//          cargo: user.cargo
//       };

//       localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(userData));
//       localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, token);

//       api.defaults.headers.Authorization = `Bearer ${token}`;

//       setUser(userData);
//       setToken(token);
//       setIsloggedin(true);
//    }, []);

//    return (
//       <AuthContext.Provider
//          value={{
//             user,
//             token,
//             isLoggedIn,
//             loading,
//             handleLogin,
//             logout
//          }}>
//          {children}
//       </AuthContext.Provider>
//    );
// };

// const useAuth = () => {
//    const context = useContext(AuthContext);
//    return context;
// }

// export { AuthProvider, AuthContext, useAuth };
