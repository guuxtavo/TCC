"use client"

import { useAuth } from "@/contexts/auth";
import Image from "next/image";
import { FcCalendar } from "react-icons/fc";
import MascoteImg from "../../../public/Mascote_Hellen-virada.png";
import Search from "../admin/components/search";
import worker1 from '@/../public/worker1.jpg';
import worker2 from '@/../public/worker2.jpg';


export default function HomeUser() {

   const obterDataAtual = () => {
      const dataAtual = new Date();
      const ano = dataAtual.getFullYear();
      let mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
      let dia = dataAtual.getDate().toString().padStart(2, '0');

      return `${dia}/${mes}/${ano}`;
   };

   const { nome, logout, } = useAuth();

   return (
      <div className="flex flex-col h-full w-full" >
         <div className="h-[20%]">
            <div className="relative w-full h-full">
               {/* Balãozinho com a mensagem */}
               <div className="animate-slide-right absolute bg-white w-fit p-4 rounded-lg top-5 left-12 ml-20 drop-shadow-md">
                  <span className="font-bold text-center text-xl">
                     Seja bem-vindo(a) {nome}
                  </span>
                  <span className="font-bold text-center text-xl block" >O que foi produzido hoje?</span>
               </div>

               <Image
                  className="absolute animate-slide-right -top-8 right-0 bottom-0 -left-[6rem] -rotate-6 "
                  src={MascoteImg}
                  height={250}
                  quality={100}
                  alt="Imagem do mascote Hellen"
                  priority={true}
               />

               {/* <span className="absolute top-2 bottom-2 right-[50%] text-4xl font-black flex justify-center items-center">
                  12
               </span> */}

               <div className="absolute top-0 right-0 bottom-0 w-max h-2/4  font-black text-3xl flex justify-center items-center gap-6 hover:animate-pulse mr-4"  >
                  <span >{obterDataAtual()}</span>
                  <FcCalendar size={35} />
               </div>
            </div>
         </div>


         <div className="h-full px-4" >
            <section className="flex flex-col gap-8 w-2/4 h-3/4 2xl:w-[45%] 2xl:h-[60%] bg-white rounded-lg drop-shadow-xl py-4 px-8 ml-5 mt-4">
               <h1 className="text-2xl font-black border-b-2">Controle de produção diária</h1>
               <div className="flex items-center gap-6 w-full h-fit" >

                  <div className="flex flex-col gap-2">
                     <label
                        className="font-bold text-lg"
                        htmlFor="quantidade">Modelo</label>
                     <Search width="full" placeholder="Pesquise" />
                  </div>

                  <div className="flex flex-col gap-2 w-1/4" >
                     <label
                        className="font-bold text-lg"
                        htmlFor="quantidade">Quantidade/peças</label>
                     <input
                        id="quantidade"
                        placeholder="Digite"
                        className="p-3 h-14 rounded-lg text-gray-600 text-xl font-semibold bg-slate-50 border-b-2 drop-shadow-sm border-slate-400 outline-none"
                        type="text" />
                  </div>

                  <div className="w-1/4 h-full flex items-end justify-end">
                     <button
                        className="bg-blue-600 rounded-md h-12 w-32 text-white font-semibold text-lg" >
                        Aplicar
                     </button>
                  </div>

               </div>

               <div className="grid grid-cols-2 h-2/4 mt-2 mr-5">
                  <div className="flex items-center gap-3 ">
                     <Image quality={100} priority={true} width={80} height={40} alt="Imagem do trabalhador"
                        src={worker1} />
                     <input
                        placeholder="Peter Parker"
                        className="appearance-none p-3 h-14 w-full rounded-sm text-gray-600 text-xl font-semibold bg-slate-50 border drop-shadow-md border-slate-400 outline-none" />
                  </div>
                  <div className="flex items-center gap-3">
                     <Image quality={100} priority={true} width={80} height={40} alt="Imagem do trabalhador"
                        src={worker2} />
                     <input
                        placeholder="Clark Kent"
                        className="appearance-none p-3 h-14 w-full rounded-sm text-gray-600 text-xl font-semibold bg-slate-50 border drop-shadow-md border-slate-400 outline-none" />
                  </div>
                  <div className="flex items-center gap-3">
                     <Image quality={100} priority={true} width={80} height={40} alt="Imagem do trabalhador"
                        src={worker2} />
                     <input
                        placeholder="Bruce Wayne"
                        className="appearance-none p-3 h-14 w-full rounded-sm text-gray-600 text-xl font-semibold bg-slate-50 border drop-shadow-md border-slate-400 outline-none" />
                  </div>
                  <div className="flex items-center gap-3">
                     <Image quality={100} priority={true} width={80} height={40} alt="Imagem do trabalhador"
                        src={worker1} />
                     <input
                        placeholder="Tony Stark"
                        className="appearance-none p-3 h-14 w-full rounded-sm text-gray-600 text-xl font-semibold bg-slate-50 border drop-shadow-md border-slate-400 outline-none" />
                  </div>
               </div>
            </section>
         </div>
      </div>

   )
}