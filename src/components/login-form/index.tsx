import { useAuth } from "@/contexts/auth";
import { AuthService } from "@/services/api/auth";
import { User } from "@/types/User";
import { useRouter } from "next/navigation"; // Importando o useRouter
import { TbLockSquareRounded, TbUserSquare } from "react-icons/tb";

import { authValidationSchema } from "@/validations/authValidations";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import InputMask from 'react-input-mask';
import { useEffect, useState } from "react";
import { ModalPassword } from "../modal";

type FormValue = {
   cpf: string,
   senha: string,
}

export function FormLogin() {
   const { handleLogin, isLoggedIn, role, isFirstAccess } = useAuth();
   const router = useRouter();

   const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
   } = useForm<FormValue>({ resolver: yupResolver(authValidationSchema) });

   useEffect(() => {
      if (isLoggedIn && role) {
         console.log("LOGADO? " + isLoggedIn + " Role: " + role);
         const redirectTo = role === 'admin' ? '/admin' : '/user';
         router.replace(redirectTo);
      }
   }, [isLoggedIn, role, router]);

   const handleLoginButton = async () => {
      try {
         const formData = getValues();
         const { cpf, senha } = formData;
         const response = await AuthService.auth(cpf, senha);

         if (response instanceof Error) {
            console.error('Erro na autenticação:', response.message);
            return;
         }

         const token = response.token;
         const userData: User = response.user;

         if (token && userData) {
            handleLogin(userData, token);
         } else {
            console.error('Token ou userData é undefined');
         }
      } catch (error) {
         console.error('Erro durante o login:', error);
      }
   };


   return (

      <>

         <form onSubmit={handleSubmit(handleLoginButton)}
            className={`max-h-full w-4/6 my-8 flex flex-col ${Object.keys(errors).length === 0 ? 'gap-10' : 'gap-4'}`}>
            <div>
               <h2 className="text-3xl text-left 2xl:text-4xl text-g-red-600 font-black mb-4">Faça login na sua conta</h2>
               <p className="text-gray-400 font-medium text-xl 2xl:text-2xl 2xl:mb-8">Preencha os campos <br />abaixo!</p>
            </div>

            <div className="flex w-[90%]">
               <InputMask
                  id="cpf"
                  {...register('cpf')}
                  mask="999.999.999-99"  // Defina a máscara desejada
                  maskChar={""}
                  className="w-full border-2 px-4 py-3 2xl:px-5 2xl:py-4 bg-gray-200 rounded-l outline-none text-slate-800 text-lg font-semibold"
                  type="text"
                  placeholder="CPF"
               />

               <span className="flex justify-center items-center w-24 bg-gray-200 rounded-r">
                  <TbUserSquare className="text-gray-500" size={30} />
               </span>

            </div>

            {errors.cpf && <span className="text-red-600 text-base font-bold" >{errors.cpf?.message}</span>}

            <div className="flex w-[90%] ">
               <input
                  id="senha"
                  {...register('senha')}
                  className="w-full border-2 px-4 py-3 2xl:px-5 2xl:py-4 bg-gray-200 rounded-l outline-none text-slate-800 text-lg 2xl:text-xl font-semibold" type="password"
                  placeholder="Senha"
               />

               <span className="flex justify-center items-center w-24 bg-gray-200 rounded-r">
                  <TbLockSquareRounded className="text-gray-500" size={30} />
               </span>
            </div>

            {errors.senha && <span className="text-red-600 text-base font-bold">{errors.senha?.message}</span>}

            <div className="mx-auto 2xl:mt-6" >
               <button
                  type="submit"
                  className="px-16 py-3 w-60  rounded-3xl border-2 border-g-red-600 text-red-950 font-extrabold text-md 2xl:text-lg hover:bg-g-red-600 hover:text-white transition-all duration-200"
               >
                  Entrar
               </button>
            </div>



         </form>


      </>
   )

}
