import Image from "next/image"

import MascoteImg from "../../../public/Mascote_Hellen-removebg-preview.png";
export const ModalPassword = () => {

   return (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-transparent/30 w-full h-full flex justify-center items-center" >
         <div className="fixed bg-white w-1/4 h-2/4 rounded-md flex" >

            <div className="h-full w-full rounded-tl-md rounded-bl-md flex justify-center items-center" >
               <div className="h-full w-3/4 flex flex-col gap-4 items-center py-4">
                  <div className="">
                     <h1 className="text-2xl text-left text-g-red-600 font-extrabold">Novo por aqui?</h1>
                     <span className="text-2xl text-left text-black font-extrabold" >Por favor, redefina sua senha!</span>
                  </div>

                  <div>
                     <label
                        className="text-xl font-bold"
                        htmlFor="password">Senha</label>
                     <input
                        type="password"
                        placeholder="Senha"
                        id="password"
                        className="p-3 w-full h-16 rounded-md text-gray-600 text-xl font-semibold bg-slate-50 border drop-shadow-md border-slate-400 outline-none transition-all duration-300"></input>

                  </div>

                  <div>
                     <label
                        className="text-xl font-bold"
                        htmlFor="">Confirme sua senha</label>
                     <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirme a Senha"
                        className="p-3 w-full h-16 rounded-md text-gray-600 text-xl font-semibold bg-slate-50 border drop-shadow-md border-slate-400 outline-none transition-all duration-300"></input>
                  </div>

                  <div className="mt-6" >
                     <button className="px-16 py-3 w-60  rounded-xl border-2 border-g-red-600 text-red-950 font-extrabold text-md 2xl:text-lg hover:bg-g-red-600 hover:text-white transition-all duration-200">Confirmar</button>
                  </div>
               </div>
            </div>

            <div className="bg-g-red-600 h-full w-[40%] rounded-tr-md rounded-br-md flex flex-col items-center">
               <Image
                  className="transform -rotate-12 absolute bottom-0 right-5 z-10 overflow-hidden"
                  src={MascoteImg}
                  height={200}
                  width={100}
                  quality={100}
                  alt="Imagem do mascote Hellen"
                  priority={true} />
            </div>

         </div>
      </div>

   )
}
