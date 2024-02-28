"use client"

import { GrUserWorker } from "react-icons/gr";
import { Button } from "../../../../components/button";
import { Container } from "../../../../components/container";
import Input from "../../../../components/input";
// React Hook Form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";

// Yup
import { ModalMessage } from "@/components/messageModal";
import { WorkerService } from "@/services/api/worker";
import { CustomError } from "@/types/Error";
import { Worker } from "@/types/Worker";
import { workerValidationSchema } from "@/validations/workerValidations";
import { useEffect, useState } from "react";

export default function RegisterWorker() {

   const { register, handleSubmit, reset, formState: { errors }, setValue, control } = useForm<Worker>({ resolver: yupResolver(workerValidationSchema) });
   const [loading, setLoading] = useState(false);
   const [showModalMessage, setShowModalMessage] = useState(false);
   const [modalType, setModalType] = useState('');
   const [message, setMessage] = useState('');
   const [isAdmin, setIsAdmin] = useState(false);

   useEffect(() => {
      // Mostra a mensagem de sucesso por 3 segundos após o cadastro bem-sucedido
      if (showModalMessage) {
         const timer = setTimeout(() => {
            if (modalType !== "error") {
               setValue('login', '');
               reset();
            }

            setShowModalMessage(false);

         }, 3500);

         return () => clearTimeout(timer);
      }
   }, [showModalMessage, reset, setValue, modalType]);


   const handleReset = () => {
      setValue('login', ''); // Define o valor do campo 'login' como vazio
      reset(); // Realiza o reset
   };


   const onSubmit = async (data: Worker) => {
      try {
         setLoading(true);

         const formData = {
            nome: data.nome,
            login: data.login,  // ou algo semelhante dependendo da sua lógica
            password: data.login,  // ou algo semelhante dependendo da sua lógica
            classificacao: data.classificacao,
            cargo: data.cargo,
            role: data.role ? "ADMIN" : "USER",
            dataNascimento: data.dataNascimento,
            primeiroAcesso: true,
         };

         const response = await WorkerService.registerWorker(formData);

         console.log("Resposta da API no onSubmit: ", response)

         if (response) {
            setShowModalMessage(true)
            setModalType("success")
            setMessage("Funcionário cadastrado com sucesso")
         }


      } catch (error: unknown) {
         if (error instanceof Error) {
            console.error("Erro geral:", error.message);
         } else if (typeof error === 'object' && error !== null) {
            const customError = error as CustomError;
            console.error("Erro personalizado:", customError.message);
            setMessage("Login inválido ou já existente")
            setModalType("error")
            setShowModalMessage(true)
            if (customError.status) {
               console.error("Status do erro:", customError.status);
               setMessage("Login inválido ou já existente")
               setModalType("error")
               setShowModalMessage(true)
            }
         } else {
            console.error("Erro desconhecido");
            setMessage("Login inválido ou já existente")
            setModalType("error")
            setShowModalMessage(true)
         }
      } finally {

         setLoading(false);

      }
   };
   return (

      <Container >

         {showModalMessage && (
            <ModalMessage message={message} type={modalType} />
         )}

         <form onSubmit={handleSubmit(onSubmit)} >
            <div className="w-full flex items-center justify-between" >
               <div className="w-fit flex gap-8 items-center ml-4">
                  <h1 className="text-4xl 2xl:text-5xl font-bold">Funcionário</h1>
                  <GrUserWorker size={35} />
               </div>
               <div className="w-fit mr-10 flex gap-3" >
                  <input
                     type="checkbox" id="role" {...register("role")}
                     className="w-5 rounded-xl"
                     onChange={() => setIsAdmin(!isAdmin)}
                  />
                  <p className="font-bold text-g-red-600 text-xl" >Acesso administrativo</p>
               </div>
            </div>

            <div className="h-fit ml-7 2xl:ml-14 flex flex-col" >

               <div className="my-5 2xl:my-12" >
                  <h1 className="text-2xl font-bold" >Informações</h1>
                  <div className="h-1 bg-slate-800 w-2/4 border"></div>
               </div>

               <section className="grid grid-cols-2 gap-y-5 gap-x-16 w-full" >

                  <Input
                     error={errors.nome}
                     register={register}
                     type="text"
                     name="nome"
                     placeholder="Nome"
                     label="Nome"
                     width="3/4" />


                  <Input
                     error={errors.login}
                     register={register}
                     type="cpf"
                     name="login"
                     placeholder="CPF"
                     label="Login"
                     width="2/4" />


                  <Input
                     error={errors.dataNascimento}
                     register={register}
                     type="date"
                     name="dataNascimento"
                     placeholder="CPF"
                     label="Data de Nascimento"
                     width="2/4" />


                  <div className="flex flex-col gap-2">
                     <label className="text-xl font-bold block mb-2" htmlFor="cargo">
                        Cargo
                     </label>
                     <div className="flex gap-1 items-center">
                        <Controller
                           control={control}
                           name="cargo"
                           render={({ field }) => (
                              <select
                                 id="cargo"
                                 {...field}
                                 className={`px-3 appearance-none h-16 w-2/4 rounded-lg text-black-700 text-xl font-semibold bg-slate-50 border-2 drop-shadow-sm outline-none transition-all duration-300 hover:scale-95 ${errors.cargo ? 'border-red-500' : ''} `}
                              >
                                 <option value="">Selecione</option>
                                 {isAdmin ? (
                                    <>
                                       <option value="RH">RH</option>
                                       <option value="Gerente">Gerente</option>
                                       {/* Adicione outras opções de cargo específicas para administradores */}
                                    </>
                                 ) : (
                                    <>
                                       <option value="Armador">Armador</option>
                                       <option value="Final">Final</option>
                                       <option value="Encosteiro">Encosteiro</option>
                                       <option value="Assenteiro">Assenteiro</option>
                                    </>
                                 )}
                              </select>
                           )}
                        />
                        {errors.cargo && <MdErrorOutline color="red" size={25} />}
                     </div>
                  </div>

                  <div className="flex flex-col gap-2">
                     <label className="text-xl font-bold block mb-2" htmlFor="cargo">
                        Classificação
                     </label>
                     <div className="flex gap-1 items-center" >
                        <Controller
                           control={control}
                           name="classificacao"
                           render={({ field }) => (
                              <select
                                 id="classificacao"
                                 {...field}
                                 className={`px-3 appearance-none h-16 w-2/4 rounded-lg text-gray-700 text-xl font-semibold bg-slate-50 border-2 drop-shadow-sm outline-none transition-all duration-300 hover:scale-95 ${errors.classificacao ? 'border-red-500' : ''} `}
                              >
                                 <option value="">Selecione</option>
                                 <option value="Profissional">Profissional</option>
                                 <option value="Aprendiz">Aprendiz</option>
                                 {/* Adicione outras opções de cargo específicas para administradores */}
                              </select>
                           )}
                        />
                        {errors.cargo && <MdErrorOutline color="red" size={25} />}
                     </div>


                  </div>

               </section>


               <div className="w-3/4 flex justify-end items-center gap-5 mx-auto my-5 2xl:my-14" >
                  <Button type="button" text="Cancelar" handleReset={handleReset} />
                  <Button type="submit" text="Salvar" />
               </div>
            </div>

         </form>


      </Container>
   )
}
