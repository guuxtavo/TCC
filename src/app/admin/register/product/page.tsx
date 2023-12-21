import { Container } from "../../components/container";
import Input from "../../components/input";
import { Button } from "../../components/button";
import { FaCouch } from "react-icons/fa";

const Product = () => {
   return (

      <Container >
         <div className="w-full flex items-center gap-10 mb-8" >
            <h1 className="text-4xl 2xl:text-5xl font-bold" >Produto</h1>
            <FaCouch size={35} />
         </div>

         <div className="h-fit ml-12 flex flex-col gap-14" >
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
               <Input placeholder="Modelo" label="Modelo" width="3/4" />
               <Input placeholder="Cor" label="Cor" width="1/4" />
               <div>
                  <label
                     className="text-xl font-semibold block mb-4"
                     htmlFor="">Tipo</label>
                  <div className="w-fit flex gap-4 items-center" >
                     <input className="w-5 h-5 rounded-full text-blue-400" type="checkbox" />
                     <label
                        className="text-xl bold"
                        htmlFor="">Sofá</label>
                     <input className="w-5 h-5 rounded-full" type="checkbox" />
                     <label
                        className="text-xl bold"
                        htmlFor="">Namoradeira</label>
                  </div>
               </div>
               <Input placeholder="Pontuação" label="Pontuação" width="1/4" />
            </div>

            <div className="w-fit flex justify-end items-center gap-4 my-10 2xl:my-10 mx-auto" >
               <Button text="Cancelar" />
               <Button text="Salvar" />
            </div>

         </div>

      </Container>
   );
}

export default Product;