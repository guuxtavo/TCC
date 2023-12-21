"use client"

import { Header } from "@/components/header";
import { LoginCard } from "@/components/login-card";



export default function HomeLogin() {

  return (
    <main className="mx-auto max-w-screen h-screen flex flex-col">
      <Header />
      <LoginCard />
    </main>
  )
}
