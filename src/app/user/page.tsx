"use client"

import { useAuth } from "@/contexts/auth";
import { Container } from "../../components/container";


export default function HomeUser(){

   const { nome, logout } = useAuth();

   // const { user, logout } = useAuth();

   return(
         <Container>
            <h2 className="font-bold text-center text-2xl ">Tela de Usuário</h2>
            <h2 className="font-bold text-center text-2xl " >Seja vem vindo(a) {nome}</h2>       
         </Container>

   )
}