"use client"

import { useAuth } from "@/contexts/auth";
import { useRouter } from "next/navigation"; // Importando o useRouter
import { TbLockSquareRounded, TbUserSquare } from "react-icons/tb";

import { changePasswordValidationSchema } from "@/validations/changePasswordValidationSchema";
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ModalMessage } from "../messageModal";
import { AuthService } from "@/services/api/auth";
import { ChangePassword } from "@/types/ChangePassword";

type ChangePasswordFormValue = {
   novaSenha: string;
   confirmarSenha: string;
};


export function FormChangePassword() {
   const { handleLogin, isLoggedIn, role, isFirstAccess, id } = useAuth();
   const router = useRouter();
   const [showModalMessage, setShowModalMessage] = useState(false);
   const [modalType, setModalType] = useState('');
   const [message, setMessage] = useState('');

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      getValues,
   } = useForm<ChangePasswordFormValue>({ resolver: yupResolver(changePasswordValidationSchema) });

   useEffect(() => {
      // Mostra a mensagem de sucesso por 3 segundos após o cadastro bem-sucedido
      if (showModalMessage) {
         const timer = setTimeout(() => {
            setShowModalMessage(false);

         }, 3500);

         return () => clearTimeout(timer);
      }
   }, [showModalMessage, reset, modalType]);

   const handleLoginButton = async () => {
      try {

         const data: ChangePassword = {
            id: id,
            novaSenha: getValues('novaSenha')
         }
         const response = await AuthService.changePassword(data)

         console.log("Response: " + response)

         setMessage("Senha alterada com Sucesso");
         setModalType("success");
         setShowModalMessage(true);
         reset(); // Limpa os campos do formulário após o envio bem-sucedido
         if (isLoggedIn && role) {
            console.log("Entrou no changepassword")
            const redirectTo = role === 'admin' ? '/admin' : '/user';
            router.replace(redirectTo);
         }
      } catch (error) {
         console.error("Erro durante a troca de senha:", error);
         setMessage("Erro ao alterar a senha. Tente novamente.");
         setModalType("error");
         setShowModalMessage(true);
      }
   };

   return (

      <>
         {showModalMessage && (
            <ModalMessage message={message} type={modalType} />
         )}

         <form onSubmit={handleSubmit(handleLoginButton)}
            className={`max-h-full w-4/6 my-8 flex flex-col ${Object.keys(errors).length === 0 ? 'gap-10' : 'gap-4'}`}>
            <div>
               <h2 className="text-3xl text-left 2xl:text-4xl text-g-red-600 font-black mb-4">Faça a alteração de sua senha</h2>
               <p className="text-gray-400 font-medium text-xl 2xl:text-2xl 2xl:mb-8">Preencha os campos <br />abaixo!</p>
            </div>

            <div className="flex w-[90%]">
               <input
                  id="senha"
                  {...register("novaSenha")}
                  className="w-full border-2 px-4 py-3 2xl:px-5 2xl:py-4 bg-gray-200 rounded-l outline-none text-slate-800 text-lg 2xl:text-xl font-semibold" type="password"
                  placeholder="Nova Senha"
               />

               <span className="flex justify-center items-center w-24 bg-gray-200 rounded-r">
                  <TbUserSquare className="text-gray-500" size={30} />
               </span>

            </div>

            {errors.novaSenha && <span className="text-red-600 text-base font-bold" >{errors.novaSenha?.message}</span>}

            <div className="flex w-[90%] ">
               <input
                  id="confirmarSenha"
                  {...register("confirmarSenha")}
                  className="w-full border-2 px-4 py-3 2xl:px-5 2xl:py-4 bg-gray-200 rounded-l outline-none text-slate-800 text-lg 2xl:text-xl font-semibold" type="password"
                  placeholder="Confirmar Nova Senha"
               />

               <span className="flex justify-center items-center w-24 bg-gray-200 rounded-r">
                  <TbLockSquareRounded className="text-gray-500" size={30} />
               </span>
            </div>

            {errors.confirmarSenha && <span className="text-red-600 text-base font-bold">{errors.confirmarSenha?.message}</span>}

            <div className="mx-auto" >
               <button
                  type="submit"
                  className="px-16 py-3 w-60  rounded-3xl border-2 border-g-red-600 text-red-950 font-extrabold text-md 2xl:text-lg hover:bg-g-red-600 hover:text-white transition-all duration-200"
               >
                  Salvar
               </button>
            </div>

         </form>


      </>
   )

}
