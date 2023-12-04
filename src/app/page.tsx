"use client"

import { Header } from "@/components/header";
import { FormLogin } from "@/components/loginForm";


export default function HomeLogin() {

  return (
    <main className="mx-auto max-w-screen h-screen flex flex-col">
      <Header />

      <section className="h-full w-full flex justify-center items-center" >
        <div className="max-w-[55%] w-full h-[68%]  bg-white rounded-2xl flex drop-shadow-xl" >
          <div className="h-full w-[28%] bg-g-red-600 rounded-l-2xl flex justify-center items-center p-5">
            <div className="flex flex-col gap-10 ml-2 p-3 rounded-md" >
              <h1 className="text-xl text-left text-white font-bold 2xl:text-3xl">Seja bem-vindo Primo(a)!</h1>
              <p className="text-lg text-left text-white font-extralight 2xl:text-2xl" >Esse é o seu sistema para controle de produção de estofados <strong className="font-extrabold">Hellen</strong></p>
            </div>
          </div>
          <div className="h-full w-[72%] flex justify-center" >
            <FormLogin />
          </div>
        </div>
      </section>

    </main>
  )
}
