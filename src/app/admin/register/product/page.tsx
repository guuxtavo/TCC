"use client"

import { Container } from "../../../../components/container";
import Input from "../../../../components/input";
import { Button } from "../../../../components/button";
import { FaCouch } from "react-icons/fa";
import { Product } from "@/types/Product";
import { Controller, useForm } from "react-hook-form";
import { productValidationSchema } from "@/validations/productValidations"
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductService } from "@/services/api/product";
import { useEffect, useState } from "react";
import { CustomError } from "@/types/Error";
import { ModalMessage } from "@/components/messageModal";

const RegisterProduct = () => {

  const { register, handleSubmit, reset, formState: { errors }, getValues, setValue, control } = useForm<Product>({ resolver: yupResolver(productValidationSchema) });
  const [loading, setLoading] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [modalType, setModalType] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Mostra a mensagem de sucesso por 3 segundos após o cadastro bem-sucedido
    if (showModalMessage) {
      const timer = setTimeout(() => {
        if(modalType !== "error"){    
          reset();
        }

        setShowModalMessage(false);

      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [showModalMessage, reset, modalType]);


  const onSubmit = async (data: Product) => {
    try {

      data.status = "Ativo"
      setLoading(true);
      data.pontuacao = parseFloat(String(data.pontuacao));

      const response = await ProductService.registerProduct(data);

      console.log("Resposta da API no onSubmit: ", response)

      if (response) {
        setShowModalMessage(true)
        setModalType("success")
        setMessage("Produto Cadastrado com Sucesso")
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
        setMessage("Erro ao cadastrar Produto")
        setModalType("error")
        setShowModalMessage(true)
      }
    } finally {

      setLoading(false);

    }
  };

  return (

    <Container>


      {showModalMessage && (
        <ModalMessage message={message} type={modalType} />
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex items-center gap-10 mb-8">
          <h1 className="text-4xl 2xl:text-5xl font-bold">Produto</h1>
          <FaCouch size={35} />
        </div>

        <div className="h-fit ml-10 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-y-4 gap-x-10">
            <Input
              name="modelo"
              error={errors.modelo}
              register={register}
              type="text"
              placeholder="Modelo"
              label="Modelo"
              width="3/4"
            />

            <Input
              name="cor"
              error={errors.cor}
              register={register}
              type="text"
              placeholder="Cor"
              label="Cor"
              width="2/4"
            />

            <div>
              <label className="text-xl font-semibold block mb-4" htmlFor="tipo">
                Tipo
              </label>
              <div className="w-fit flex gap-4 items-center">
                {/* Utilizamos o Controller para os radio buttons */}
                <Controller
                  control={control}
                  name="tipo"
                  rules={{ required: 'Selecione um tipo' }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        className="w-5 h-5 rounded-full text-blue-400"
                        type="radio"
                        value="Sofá"
                      />
                      <label className="text-xl bold">Sofá</label>
                    </>
                  )}
                />

                <Controller
                  control={control}
                  name="tipo"
                  rules={{ required: 'Selecione um tipo' }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        className="w-5 h-5 rounded-full"
                        type="radio"
                        value="Namoradeira"
                      />
                      <label className="text-xl bold">Namoradeira</label>
                    </>
                  )}
                />
              </div>
              {/* Exibimos a mensagem de erro para o campo 'tipo' */}
              {errors.tipo && <p className="text-red-600 text-base font-bold">{errors.tipo.message}</p>}
            </div>

            <Input
              name="pontuacao"
              type="text"
              error={errors.pontuacao}
              register={register}
              placeholder="Pontuação"
              label="Pontuação"
              width="2/4"
            />
          </div>

          <div className="w-fit flex justify-end items-center gap-4 my-8 2xl:my-10 mx-auto">
            <Button type="button" text="Cancelar" handleReset={() => reset()} />
            <Button text="Salvar" />
          </div>
        </div>
      </form>
    </Container>
  );
}

export default RegisterProduct;