import { ReactNode } from "react"

type Props = {
   children: ReactNode
}

export const Container = ({ children }: Props) => {
   return (
      <section className="h-[90%] w-[90%] bg-white rounded-lg drop-shadow-xl py-6 px-8 animate-slide-down duration-800 ease-in-out">
                   {/* <input
               placeholder="Digite seu nome"
               className="border-2 mb-5 px-4 py-3 2xl:px-5 2xl:py-4 bg-gray-200 rounded outline-none text-slate-800" type="text" /> */}
         {children}
      </section>
   )
}