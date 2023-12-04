import { TbUserSquare } from "react-icons/tb";
import { TbLockSquareRounded } from "react-icons/tb";

export function FormLogin() {

   return (
      <div className="max-h-full w-4/6 my-9 flex flex-col gap-10">
         <div>
            <h2 className="text-3xl text-left 2xl:text-4xl text-g-red-600 font-black mb-4">Faça login na sua conta</h2>
            <p className="text-gray-400 font-medium text-xl 2xl:text-2xl 2xl:mb-8">Preencha os campos <br />abaixo!</p>
         </div>

         <div className="flex w-[90%]">
            <input className="w-full border-2 px-4 py-3 2xl:px-5 2xl:py-4 bg-gray-200 rounded-l outline-none text-slate-800 text-lg font-semibold" type="text"
               placeholder="CPF"
            />

            <span className="flex justify-center items-center w-24 bg-gray-200 rounded-r">
               <TbUserSquare className="text-gray-500" size={30} />
            </span>
         </div>

         <div className="flex w-[90%]">
            <input className="w-full border-2 px-4 py-3 2xl:px-5 2xl:py-4 bg-gray-200 rounded-l outline-none text-slate-800 text-lg 2xl:text-xl font-semibold" type="password"
               placeholder="Senha"
            />

            <span className="flex justify-center items-center w-24 bg-gray-200 rounded-r">
               <TbLockSquareRounded className="text-gray-500" size={30} />
            </span>
         </div>




         <button className="px-16 py-3 w-60 mx-auto rounded-3xl border-2 border-g-red-600 text-red-950 font-extrabold text-md 2xl:text-lg hover:bg-g-red-600 hover:text-white transition-all duration-200" >
            Entrar
         </button>

      </div>
   )

}


// export function FormLogin() {

//    return (
//       <div className="max-h-full w-4/6 my-9 flex flex-col gap-5">
//          <h2 className="text-3xl text-left 2xl:text-4xl text-g-red-600 font-black ">Faça login na sua conta</h2>
//          <p className="text-gray-400 font-medium text-xl 2xl:text-2xl mb-3 2xl:mb-8">Preencha os campos <br />abaixo!</p>

//          <input className="border-2 mb-5 px-4 py-3 2xl:px-5 2xl:py-4 bg-gray-200 rounded outline-none text-slate-800" type="text"
//             placeholder="CPF"
//          />
//          <input className="border-2 mb-6 px-4 py-3 2xl:mb-12 2xl:px-5 2xl:py-4 bg-gray-200 rounded outline-none"
//             type="password"
//             placeholder="Senha"
//          />
//          <button className="px-16 py-3 w-60 mx-auto rounded-3xl border-2 border-g-red-600 text-red-950 font-extrabold text-md 2xl:text-lg hover:bg-g-red-600 hover:text-white transition-all duration-200" >
//             Entrar
//          </button>

//       </div>
//    )

// }