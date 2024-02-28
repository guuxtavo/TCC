import mascoteSentada from "@/../public/mascote-hellen-sentada.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import worker1 from '@/../public/worker1-removebg-preview.png';
import worker2 from '@/../public/worker2-removebg-preview.png';

import { AllWorkspaces, WorkspaceService } from "@/services/api/workspace";
import { Workspace } from "@/types/Workspace";
import { workspaceValidationSchema } from "@/validations/workspaceValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { ModalMessage } from "../../../../components/messageModal";
import WorkerSelect from "../workerSelect";
import { useQuery } from "react-query";


type editProductModalProps = {
   registerData: AllWorkspaces | undefined;
   isOpen: boolean,
   onClose: () => void,
   // updateData: (workers: Worker[]) => void,
   // editedWorker: Worker[],
}

const EditWorkspaceModal = ({ registerData, onClose }: editProductModalProps) => {
   const { handleSubmit, formState: { errors }, setValue, register, reset, control } = useForm<Workspace>({ resolver: yupResolver(workspaceValidationSchema) });

   const { data: availableWorkspace, refetch } = useQuery(['workers'], () => WorkspaceService.getAvailableWorkspace());

   const [showModalMessage, setShowModalMessage] = useState(false);
   const [modalType, setModalType] = useState('');
   const [message, setMessage] = useState('');

   const [formData, setFormData] = useState<Partial<Workspace>>({
      numero: 0,
      funcionario1: 0,
      funcionario2: 0,
      funcionario3: 0,
      funcionario4: 0,
   });

   useEffect(() => {
      console.log("Entrou no useEffect")
      if (showModalMessage) {
         const timer = setTimeout(() => {
            if (modalType == "success") {
               onClose()
            }
            setShowModalMessage(false);
         }, 2500);

         return () => clearTimeout(timer);
      }
   }, [showModalMessage, modalType, onClose]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log("Entrou no handleChange")
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setValue(name as keyof Workspace, value);
   };


   const onSubmit = async (data: Workspace) => {

      try {

         console.log("Entrou no editWorkspace modal")
         const workspaceData = {
            id: data.id,
            numero: data.numero,
            status: data.status,
            funcionario_armador: data.funcionario1,
            funcionario_assenteiro: data.funcionario2,
            funcionario_encosteiro: data.funcionario3,
            funcionario_final: data.funcionario4

         }

         const response = await WorkspaceService.editWorkspace(workspaceData)

         console.log("Response do editWorker: " + JSON.stringify(response))

         if (response) {
            setShowModalMessage(true)
            setModalType("success")
            setMessage("Célula editada com sucesso")
         }

      } catch (error) {
         setShowModalMessage(true)
         setModalType("error")
         setMessage("Número já cadastrado!")
      }

   };

   useEffect(() => {
      if (registerData) {
         setFormData(registerData);
         reset(registerData)
      }
   }, [registerData, reset]);

   return (

      <form onSubmit={handleSubmit(onSubmit)}>



         <div className="fixed top-0 left-0 w-full h-full bg-transparent/50 flex justify-center items-center z-10" >

            {showModalMessage && (
               <ModalMessage message={message} type={modalType} />
            )}

            <div className="h-[50%] w-[45%] 2xl:h-[60%] bg-slate-50 flex flex-col justify-between p-4 drop-shadow-md rounded-md animate-slide-down">

               <div className="flex items-center justify-between px-5 rounded-md h-12" >
                  <Image

                     className="absolute -top-20 right-16"
                     priority={true}
                     quality={100}
                     alt="Imagem da boneca hellen sentada"
                     width={85}
                     height={50}
                     src={mascoteSentada} />
                  <h1 className="text-3xl w-full font-black">Edição de Célula</h1>
                  <span
                     onClick={onClose}
                     className="text-2xl font-bold hover:cursor-pointer hover:scale-105 hover:text-red-500">X</span>
               </div>
               <tr className="bg-g-red-600 h-2 w-3/4 ml-4 rounded-md" />

               <div className="h-3/4 py-4 px-5 " >
                  <section className="flex flex-col gap-8 h-full" >

                     <div className="flex flex-col gap-2 w-fit" >
                        <label
                           className="text-lg font-bold w-fit"
                           htmlFor="nome">Numero</label>
                        <div className="flex gap-1 items-center" >
                           <input
                              id="numero"
                              {...register('numero')}
                              defaultValue={formData.numero || ''}
                              onChange={handleChange}
                              className={`border-2 outline-none p-2 bg-slate-50 rounded-md w-2/4 ${errors.numero ? 'border-red-500' : ''} `}
                              type="text" />
                           {errors.numero && <MdErrorOutline color="red" size={25} />}
                        </div>

                     </div>

                     <div className="grid grid-cols-2 gap-y-4 gap-x-4">

                        <div className="flex items-center gap-1">
                           <Image quality={100} priority={true} width={40} height={40} alt="Imagem do trabalhador"
                              src={worker2} />
                           <select
                              {...register('funcionario1')}

                              className={`border-2 outline-none p-2 bg-slate-50 rounded-md w-full ${errors.funcionario1 ? 'border-red-500' : ''} `}
                           >
                              <option>Selecione um Armador</option>
                              <option value={registerData?.funcionario_armador.id} selected id="">{registerData?.funcionario_armador.nome}</option>
                              {availableWorkspace?.funcionarioArmador?.map((worker) => (
                                 <option key={worker.id} value={worker.id} >{worker.nome}</option>

                              ))}
                           </select>

                        </div>

                        <div className="flex items-center gap-1">
                           <Image quality={100} priority={true} width={40} height={40} alt="Imagem do trabalhador"
                              src={worker1} />
                           <select
                              {...register('funcionario2')}

                              className={`border-2 outline-none p-2 bg-slate-50 rounded-md w-full ${errors.funcionario2 ? 'border-red-500' : ''} `}
                           >
                              <option value="">Selecione um Assenteiro</option>
                              <option value={registerData?.funcionario_assenteiro.id} selected id="">{registerData?.funcionario_assenteiro.nome}</option>
                              {availableWorkspace?.funcionarioAssenteiro?.map((worker) => (
                                 <option key={worker.id} value={worker.id} >{worker.nome}</option>

                              ))}
                           </select>

                        </div>

                        <div className="flex items-center gap-1">
                           <Image quality={100} priority={true} width={40} height={40} alt="Imagem do trabalhador"
                              src={worker1} />

                           <select
                              {...register('funcionario3')}

                              className={`border-2 outline-none p-2 bg-slate-50 rounded-md w-full ${errors.funcionario3 ? 'border-red-500' : ''} `}
                           >
                              <option value="">Selecione um Encosteiro</option>
                              <option value={registerData?.funcionario_encosteiro.id} selected id="">{registerData?.funcionario_encosteiro.nome}</option>
                              {availableWorkspace?.funcionarioEncosteiro?.map((worker) => (
                                 <option key={worker.id} value={worker.id} >{worker.nome}</option>

                              ))}
                           </select>

                        </div>

                        <div className="flex items-center gap-1">
                           <Image quality={100} priority={true} width={40} height={40} alt="Imagem do trabalhador"
                              src={worker2} />
                           <select
                              {...register('funcionario4')}

                              className={`border-2 outline-none p-2 bg-slate-50 rounded-md w-full ${errors.funcionario4 ? 'border-red-500' : ''} `}
                           >
                              <option value="">Selecione um Final</option>
                              <option value={registerData?.funcionario_final.id} selected id="">{registerData?.funcionario_final.nome}</option>
                              {availableWorkspace?.funcionarioFinal?.map((worker) => (
                                 <option key={worker.id} value={worker.id} >{worker.nome}</option>

                              ))}
                           </select>

                        </div>

                        {/* <div className="flex items-center gap-4">
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
                        </div> */}
                     </div>
                  </section>
               </div>

               <div className="flex justify-center gap-5" >
                  <button
                     className="py-1 px-4 border h-10 bg-slate-300 rounded-lg font-bold hover:cursor-pointer"
                     onClick={onClose} >Cancelar</button>
                  <button
                     type="submit"
                     className="py-1 px-4 border h-10 bg-red-500 rounded-lg font-bold" >Editar</button>
               </div>

            </div>
         </div >
      </form >
   )

}

export default EditWorkspaceModal;