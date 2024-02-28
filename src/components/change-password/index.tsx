import Image from "next/image";
import { FormChangePassword } from "../formChangePassword";
import mascoteSentada from "@/../public/mascote-hellen-sentada.png";

export const ChangePasswordCard = () => {
   return (
      <section className="h-full w-full flex justify-center items-center relative overflow-hidden animate-slide-right duration-300 transition-all" >

         <div className="max-w-[50%] w-full h-[68%] bg-white rounded-2xl flex drop-shadow-xl" >
            <div className="h-full w-[70%] flex justify-center" >
               <FormChangePassword />
            </div>
            <div className="h-full w-[30%] bg-g-red-600 rounded-r-2xl flex justify-center items-center p-5">
               <div className="flex flex-col gap-6 ml-2 p-3 rounded-md border-4" >
                  <div className="flex gap-2" >
                     <h1 className="text-2xl text-left text-white font-bold 2xl:text-3xl">Ops!</h1>
                     <Image
                        className=""
                        priority={true}
                        quality={100}
                        alt="Imagem da boneca hellen sentada"
                        width={85}
                        height={50}
                        src={mascoteSentada} />
                  </div>

                  <p className="text-lg text-left text-white font-extralight 2xl:text-2xl" >Parece que esse é o seu primeiro acesso no nosso sistema. <strong className="font-extrabold">Hellen</strong></p>
               </div>
            </div>

         </div>

      </section>
   )
}
