"use client"

import { Header } from "@/components/header";
import { LoginCard } from "@/components/login-card";
import { ModalPassword } from "@/components/modal";
import { useAuth } from "@/contexts/auth";


export default function HomeLogin() {

  // const {  user, isLoggedIn } = useAuth();
  const { nome, login, isLoggedIn, isFirstAccess } = useAuth();
  console.log("Primeiro acesso: " + isFirstAccess)

  return (
    <main className="mx-auto max-w-screen h-screen flex flex-col">

      <Header />
      <LoginCard />


    </main>


  )
}