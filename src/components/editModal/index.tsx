import mascoteSentada from "@/../public/mascote-hellen-sentada.png";
import { Worker } from "@/types/Worker";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputMask from 'react-input-mask';
import { MdErrorOutline } from "react-icons/md";

import { WorkerService } from "@/services/api/worker";
import { workerValidationSchema } from "@/validations/workerValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomError } from "@/types/Error";
import { ModalMessage } from "../messageModal";


type editModalProps = {
   registerData: Worker | undefined;
   isOpen: boolean,
   onClose: () => void,
   // updateData: (workers: Worker[]) => void,
   // editedWorker: Worker[],
}

const obterDataAtual = (type: string) => {
   const dataAtual = new Date();
   const ano = dataAtual.getFullYear();
   let mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
   let dia = dataAtual.getDate().toString().padStart(2, '0');

   if (type === 'min') {
      return `${ano - 100}-${mes}-${dia}`;
   } else{
      return `${ano - 18}-${mes}-${dia}`;
   }

};

const EditModal = ({ registerData, onClose }: editModalProps) => {
   const { handleSubmit, formState: { errors }, setValue, register, reset, control } = useForm<Worker>({ resolver: yupResolver(workerValidationSchema) });

   const [showModalMessage, setShowModalMessage] = useState(false);
   const [modalType, setModalType] = useState('');
   const [message, setMessage] = useState('');

   const [formData, setFormData] = useState<Partial<Worker>>({
      nome: '',
      login: '',
      dataNascimento: '',
      cargo: '',
      classificacao: '',
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
      setValue(name as keyof Worker, value);
   };


   const onSubmit = async (data: Worker) => {

      try {
         const workerData = {
            id: data.id,
            nome: data.nome,
            login: data.login,
            classificacao: data.classificacao,
            dataNascimento: data.dataNascimento,
            cargo: data.cargo,
            role: data.role ? "ADMIN" : "USER",
            celula: data.celula !== null ? {
               id: data.celula?.id
            } : null
         }

         const response = await WorkerService.editWorker(workerData)

         console.log("Response do editWorker: " + JSON.stringify(response))

         if (response) {
            setShowModalMessage(true)
            setModalType("success")
            setMessage("Funcionário editado com sucesso")
         }

      } catch (error) {
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

         {showModalMessage && (
            <ModalMessage message={message} type={modalType} />
         )}

         <div className="fixed top-0 left-0 w-full h-full bg-transparent/50 flex justify-center items-center z-10" >



            <div className="h-[70%] w-[45%] 2xl:h-[60%] bg-slate-50 flex flex-col justify-between p-4 drop-shadow-md rounded-md animate-slide-down">

               <div className="flex items-center justify-between px-5 rounded-md h-12" >
                  <Image

                     className="absolute -top-20 right-16"
                     priority={true}
                     quality={100}
                     alt="Imagem da boneca hellen sentada"
                     width={85}
                     height={50}
                     src={mascoteSentada} />
                  <h1 className="text-3xl w-full font-black">Edição de Funcionário</h1>
                  <span
                     onClick={onClose}
                     className="text-2xl font-bold hover:cursor-pointer hover:scale-105 hover:text-red-500">X</span>
               </div>
               <tr className="bg-g-red-600 h-2 w-3/4 ml-4 rounded-md" />

               <div className="h-3/4 py-4 mt-4 px-5 " >
                  <section className="grid grid-cols-2 grid-rows-3 gap-x-20 gap-y-6" >

                     <div className="flex flex-col gap-2" >
                        <label
                           className="text-lg font-bold w-fit"
                           htmlFor="nome">Nome</label>
                        <div className="flex gap-1 items-center" >
                           <input
                              id="nome"
                              {...register('nome')}
                              defaultValue={formData.nome || ''}
                              onChange={handleChange}
                              className={`border-2 outline-none p-2 bg-slate-50 rounded-md w-full ${errors.nome ? 'border-red-500' : ''} `}
                              type="text" />
                           {errors.nome && <MdErrorOutline color="red" size={25} />}
                        </div>

                     </div>

                     <div className="flex flex-col gap-2" >
                        <label
                           className="text-lg font-bold w-fit"
                           htmlFor="login">Login</label>
                        <div className="flex gap-1 items-center" >
                           <InputMask
                              id="login"
                              mask="999.999.999-99"  // Defina a máscara desejada
                              maskChar={""}
                              defaultValue={formData.login || ''}
                              // onChange={handleChange}
                              placeholder="Digite o CPF"
                              className={`border-2 outline-none p-2 rounded-md bg-slate-50 w-max ${errors.login ? 'border-red-500' : ''}`}
                              {...register('login')}
                           />
                           {errors.login && <MdErrorOutline color="red" size={25} />}
                        </div>


                     </div>

                     <div className="flex flex-col gap-2" >
                        <label
                           className="text-lg font-bold w-fit"
                           htmlFor="dataNascimento">Data Nascimento</label>
                        <input
                           id="dataNascimento"
                           {...register('dataNascimento')}
                           max={obterDataAtual('max')}
                           min={obterDataAtual('min')}
                           onChange={handleChange}
                           value={formData.dataNascimento}
                           className="border-2 outline-none p-2 rounded-md bg-slate-50 w-max"
                           type="date"
                        />
                        {errors.dataNascimento && <span className="text-red-500 text-sm font-semibold" >{errors.dataNascimento.message}</span>}

                     </div>

                     <div className="flex flex-col gap-2" >
                        <label
                           className="text-lg font-bold w-fit"
                           htmlFor="cargo">Cargo</label>

                        <Controller
                           control={control}
                           name="cargo"
                           render={({ field }) => (
                              <select
                                 id="cargo"
                                 {...field}
                                 className="appearance-none border-2 outline-none p-2 rounded-md bg-slate-50 w-3/4"
                              >
                                 <option value="">Selecione</option>
                                 {registerData?.role === 'ADMIN' ? (
                                    <>
                                       <option value="RH">RH</option>
                                       <option value="Gerente">Gerente</option>
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
                        {errors.cargo && <span className="text-red-600 text-sm font-semibold">{errors.cargo.message}</span>}
                     </div>

                     <div className="flex flex-col gap-2" >
                        <label
                           className="text-lg font-bold w-fit"
                           htmlFor="classificacao">Classificação</label>
                        <Controller
                           control={control}
                           name="classificacao"
                           render={({ field }) => (
                              <select
                                 id="classificacao"
                                 {...field}
                                 className="appearance-none border-2 outline-none p-2 rounded-md bg-slate-50 w-3/4"
                              >
                                 <option value="">Selecione</option>
                                 <option value="Profissional">Profissional</option>
                                 <option value="Aprendiz">Aprendiz</option>
                              </select>
                           )}
                        />
                        {errors.classificacao && <span className="text-red-600 text-sm font-semibold">{errors.classificacao.message}</span>}

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
         </div>
      </form>
   )

}

export default EditModal;