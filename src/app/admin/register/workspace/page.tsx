"use client"

import worker1 from '@/../public/worker1-removebg-preview.png';
import worker2 from '@/../public/worker2-removebg-preview.png';
import { ModalMessage } from "@/components/messageModal";
import Input from "@/components/input";
import { CustomError } from "@/types/Error";
import { Workspace } from "@/types/Workspace";
import { workspaceValidationSchema } from "@/validations/workspaceValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GiHammerNails } from "react-icons/gi";
import { Button } from "../../../../components/button";
import { Container } from "../../../../components/container";
import WorkerSelect from "../../components/workerSelect";
import { WorkspaceService } from '@/services/api/workspace';
import { useQuery } from 'react-query';

const RegisterWorkspace = () => {

   const { register, handleSubmit, reset, formState: { errors }, getValues, setValue } = useForm<Workspace>({ resolver: yupResolver(workspaceValidationSchema) });
   const [loading, setLoading] = useState(false);
   const [showModalMessage, setShowModalMessage] = useState(false);
   const [modalType, setModalType] = useState('');
   const [message, setMessage] = useState('');
   const { data: availableWorkspace, refetch } = useQuery(['workers'], () => WorkspaceService.getAvailableWorkspace());
   useEffect(() => {
      // Mostra a mensagem de sucesso por 3 segundos após o cadastro bem-sucedido
      if (showModalMessage) {
         const timer = setTimeout(() => {
            if (modalType !== "error") {
               reset();
            }

            setShowModalMessage(false);

         }, 3500);

         return () => clearTimeout(timer);
      }
   }, [showModalMessage, reset, modalType]);

   const handleFormSubmit = async (data: Workspace) => {
      try {

         if (availableWorkspace?.numerosIndisponiveis.includes(data.numero)) {
            setShowModalMessage(true)
            setModalType("error")
            setMessage("Célula já cadastrada!")
            console.log(availableWorkspace?.numerosIndisponiveis)
            return;
         }

         console.log("Entrou no onSubmit: " + JSON.stringify(data));
         const workspaceData = {
            numero: data.numero,
            status: "Ativa",
            funcionario_final: data.funcionario4,
            funcionario_armador: data.funcionario1,
            funcionario_assenteiro: data.funcionario2,
            funcionario_encosteiro: data.funcionario3,
         };

         console.log(workspaceData)
         const response = await WorkspaceService.registerWorkspace(workspaceData)



         if (response) {
            setShowModalMessage(true)
            setModalType("success")
            refetch()
            setMessage("Célula Cadastrada com Sucesso")
         }

      } catch (error: unknown) {
         if (error instanceof Error) {
            console.error("Erro geral:", error.message);
         } else if (typeof error === 'object' && error !== null) {
            const customError = error as CustomError;
            console.error("Erro personalizado:", customError.message);
            if (customError.status) {
               console.error("Status do erro:", customError.status);
            }
         } else {
            console.error("Erro desconhecido");
            setMessage("Erro ao cadastrar Célula")
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

         <form onSubmit={handleSubmit(handleFormSubmit)} >

            <div className="w-full flex mb-8 justify-between" >
               <div className="w-fit flex gap-8 ml-4" >
                  <h1 className="text-4xl 2xl:text-5xl font-bold" >Célula</h1>
                  <GiHammerNails size={35} />
               </div>

               <Input
                  error={errors.numero}
                  register={register}
                  type="number"
                  name="numero"
                  placeholder="Numero"
                  label="Número da Célula"
                  width="2/4"
               />


            </div>

            <div className="2xl:w-[90%] h-fit ml-3 2xl:ml-10 flex flex-col gap-8" >

               <div>
                  <p className="font-bold text-2xl italic w-fit" >Selecione os tapeceiros que trabalharão nessa célula</p>
               </div>


               <div className="grid grid-cols-2 gap-y-4">
                  <div className="flex items-center gap-4">
                     <Image quality={100} priority={true} width={80} height={40} alt="Imagem do trabalhador"
                        src={worker1} />
                     <WorkerSelect workers={availableWorkspace?.funcionarioArmador ?? []} cargo="Armador" name="funcionario1" register={register} error={errors.funcionario1} />
                  </div>
                  <div className="flex items-center gap-4">
                     <Image quality={100} priority={true} width={80} height={40} alt="Imagem do trabalhador"
                        src={worker2} />
                     <WorkerSelect workers={availableWorkspace?.funcionarioAssenteiro ?? []} cargo="Assenteiro" name="funcionario2" register={register} error={errors.funcionario2} />
                  </div>
                  <div className="flex items-center gap-4">
                     <Image quality={100} priority={true} width={80} height={40} alt="Imagem do trabalhador"
                        src={worker2} />
                     <WorkerSelect workers={availableWorkspace?.funcionarioEncosteiro ?? []} cargo="Encosteiro" name="funcionario3" register={register} error={errors.funcionario3} />
                  </div>
                  <div className="flex items-center gap-4">
                     <Image quality={100} priority={true} width={80} height={40} alt="Imagem do trabalhador"
                        src={worker1} />
                     <WorkerSelect workers={availableWorkspace?.funcionarioFinal ?? []} cargo="Final" name="funcionario4" register={register} error={errors.funcionario4} />
                  </div>
               </div>

            </div>

            <div className="w-fit flex justify-end items-center gap-4 my-6 2xl:my-10 mx-auto" >
               <Button type="button" text="Cancelar" handleReset={() => reset()} />
               <Button type="submit" text="Salvar" />
               {/* <button
                     type="submit"
                     className="h-12 rounded-lg w-40 px-8 py-3 bg-blue-100">Salvar</button> */}
            </div>


         </form>

      </Container >

   );
}

export default RegisterWorkspace;