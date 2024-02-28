import mascoteSentada from "@/../public/mascote-hellen-sentada.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { ProductService } from "@/services/api/product";
import { CustomError } from "@/types/Error";
import { Product } from "@/types/Product";
import { productValidationSchema } from "@/validations/productValidations";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdErrorOutline } from "react-icons/md";
import { ModalMessage } from "../../../../components/messageModal";


type editProductModalProps = {
   registerData: Product | undefined;
   isOpen?: boolean,
   onClose: () => void,
   // updateData: (workers: Worker[]) => void,
   // editedWorker: Worker[],
}

const EditProductModal = ({ registerData, onClose }: editProductModalProps) => {
   const { handleSubmit, formState: { errors }, setValue, register, reset } = useForm<Product>({ resolver: yupResolver(productValidationSchema) });

   const [showModalMessage, setShowModalMessage] = useState(false);
   const [modalType, setModalType] = useState('');
   const [message, setMessage] = useState('');

   const [formData, setFormData] = useState<Partial<Product>>({
      modelo: '',
      cor: '',
      tipo: '',
      pontuacao: 0,
      status: ''
   });

   useEffect(() => {
      console.log("Entrou no useEffect Product")
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
      setValue(name as keyof Product, value);
   };


   const onSubmit = async (data: Product) => {

      try {
         console.log("Entrou no onSubmit do product")
         const productData = {
            id: data.id,
            modelo: data.modelo,
            cor: data.cor,
            pontuacao: data.pontuacao,
            tipo: data.tipo,
            status: data.status
         }

         const response = await ProductService.editProduct(productData)

         if (response) {
            setShowModalMessage(true)
            setModalType("success")
            setMessage("Produto editado com sucesso")
         }

      } catch (error) {
         if (error instanceof Error) {
            console.error("Erro geral:", error.message);
         } else if (typeof error === 'object' && error !== null) {
            const customError = error as CustomError;
            console.error("Erro personalizado:", customError.message);
            setMessage("Erro ao editar Produto")
            setModalType("error")
            setShowModalMessage(true)
            if (customError.status) {
               console.error("Status do erro:", customError.status);
               setMessage("Login inválido ou já existente")
               setModalType("error")
               setShowModalMessage(true)
            }
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

            <div className="h-[60%] w-[45%] 2xl:h-[60%] bg-slate-50 flex flex-col justify-between p-4 drop-shadow-md rounded-md animate-slide-down">

               <div className="flex items-center justify-between px-5 rounded-md h-12" >
                  <Image

                     className="absolute -top-20 right-16"
                     priority={true}
                     quality={100}
                     alt="Imagem da boneca hellen sentada"
                     width={85}
                     height={50}
                     src={mascoteSentada} />
                  <h1 className="text-3xl w-full font-black">Edição de Produto</h1>
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
                           htmlFor="nome">Modelo</label>
                        <div className="flex gap-1 items-center" >
                           <input
                              id="modelo"
                              {...register('modelo')}
                              defaultValue={formData.modelo || ''}
                              onChange={handleChange}
                              className={`border-2 outline-none p-2 bg-slate-50 rounded-md w-full ${errors.modelo ? 'border-red-500' : ''} `}
                              type="text" />
                           {errors.modelo && <MdErrorOutline color="red" size={25} />}
                        </div>

                     </div>

                     <div className="flex flex-col gap-2" >
                        <label
                           className="text-lg font-bold w-fit"
                           htmlFor="login">Cor</label>
                        <div className="flex gap-1 items-center" >
                           <input
                              id="cor"
                              {...register('cor')}
                              defaultValue={formData.cor || ''}
                              onChange={handleChange}
                              className={`border-2 outline-none p-2 rounded-md bg-slate-50 w-max ${errors.cor ? 'border-red-500' : ''}`}

                           />
                           {errors.cor && <MdErrorOutline color="red" size={25} />}
                        </div>

                     </div>

                     <div>
                        <label className="text-xl font-semibold block mb-4" htmlFor="tipo">
                           Tipo
                        </label>
                        <div className="w-fit flex gap-4 items-center">
                           {["Sofá", "Namoradeira"].map((tipoOption) => (
                              <div key={tipoOption} className="flex items-center gap-1">
                                 <input
                                    type="radio"
                                    value={tipoOption}
                                    checked={formData.tipo === tipoOption}
                                    onChange={(e) => handleChange({ target: { name: 'tipo', value: e.target.value } } as React.ChangeEvent<HTMLInputElement>)}
                                    className="w-4 h-4 rounded-full text-blue-400"
                                 />
                                 <label className="text-xl bold">{tipoOption}</label>
                              </div>
                           ))}
                        </div>
                        {errors.tipo && <p className="text-red-600 text-base font-bold">{errors.tipo.message}</p>}
                     </div>
                     <div className="flex flex-col gap-2" >
                        <label
                           className="text-lg font-bold w-fit"
                           htmlFor="dataNascimento">Pontuação</label>
                        <div className="flex gap-1 items-center" >
                           <input
                              id="pontuacao"
                              {...register('pontuacao')}
                              onChange={handleChange}
                              value={formData.pontuacao}
                              className={`border-2 outline-none p-2 rounded-md bg-slate-50 w-max ${errors.pontuacao ? 'border-red-500' : ''}`}
                              type="text"
                           />
                           {errors.pontuacao && <MdErrorOutline color="red" size={25} />}


                        </div>
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

export default EditProductModal;