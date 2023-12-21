import { ReactNode } from "react"

type ContainerProps = {
   children: ReactNode
}



export const Container = ({ children }: ContainerProps) => {

   return (
      <section className={`flex flex-col gap-2 w-[90%] h-fit 2xl:h-fit 2xl:w-[90%] py-6 px-8 mt-5 bg-white rounded-lg drop-shadow-2xl animate-slide-down duration-800 ease-in-out`}>
         {children}
      </section>
   )
}