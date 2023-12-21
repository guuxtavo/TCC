import { Container } from "../../components/container";
import { GrUserWorker } from "react-icons/gr";
import Input from "../../components/input";
import { Button } from "../../components/button";

export default function Worker() {
   return (

      <Container >
            <div className="w-full flex items-center justify-between " >
               <div className="w-fit flex gap-8 items-center">
                  <h1 className="text-4xl 2xl:text-5xl font-bold">Funcionário</h1>
                  <GrUserWorker size={35} />
               </div>
               <div className="w-fit mr-10 flex gap-3" >
                  <input
                     className="w-5 rounded-xl"
                     type="checkbox" />
                  <p className="font-bold text-g-red-600 text-xl" >Acesso administrativo</p>
               </div>
            </div>

            <div className="h-fit ml-7 flex flex-col" >
               <div className="my-4 2xl:my-12" >
                  <h1 className="text-2xl font-bold" >Informações</h1>
                  <div className="h-1 bg-slate-800 w-2/4 border"></div>
               </div>

               <div className="grid grid-cols-2 gap-y-6 gap-x-12 ">
                  <Input placeholder="Nome" label="Nome" width="3/4" />
                  <Input placeholder="CPF" label="CPF" width="2/4" />
                  <Input label="Data de Nascimento" width="2/4" type="date"/>
                  <Input placeholder="Selecione" label="Classificação" width="2/4" />
                  <Input placeholder="Selecione" label="Cargo/Função" width="2/4" />
               </div>

               <div className="w-3/4 flex justify-end items-center gap-4 mx-auto my-8 2xl:my-16" >
                  <Button text="Cancelar" />
                  <Button text="Salvar" />
               </div>

            </div>

      </Container>
   )
}