"use client"


import { useAuth } from "@/contexts/auth";
import { Container } from "../../components/container";

export default function HomeAdmin() {

   // const { user, logout } = useAuth();
   const { nome, isFirstAccess } = useAuth();


   return (


      <Container>

         {isFirstAccess ? <div>
            <h1>Tem que trocar a senha parceiro!</h1>

         </div> : null}

         <h2 className="font-bold text-center text-2xl ">Tela de Admin</h2>
         <h2 className="font-bold text-center text-2xl " >Seja vem vindo(a) {nome}</h2>
         
      </Container>


   )

}