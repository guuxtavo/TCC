import Image from "next/image";
import { Container } from "../../components/container";
import worker1 from "@/../public/worker1.jpg";
import worker2 from "@/../public/worker2.jpg";
import Input from "../../components/input";
import { Button } from "../../components/button"
import { GiHammerNails } from "react-icons/gi";


const Workspace = () => {
   return (
      <Container >
         <div className="w-full flex items-center gap-14 mb-8" >
            <h1 className="text-4xl 2xl:text-5xl font-bold" >Célula</h1>
            <GiHammerNails size={35} />
         </div>

         <div className="2xl:w-[90%] h-fit ml-3 flex flex-col gap-10" >

            <div className="w-2/4" >
               <Input width="2/4" placeholder="Digite.." label="Número da Célula"/>
            </div>

            <div>
               <p className="font-bold text-2xl italic w-fit" >Digite o nome dos tapeceiros que trabalham nessa célula</p>
            </div>

            <div className="grid grid-cols-2 gap-y-4">
               <div className="flex items-center gap-4">
                  <Image quality={100} priority={true} width={80} height={40} alt="Imagem do trabalhador"
                  src={worker1}/>
                  <Input placeholder="Armador" width="full" />
               </div>
               <div className="flex items-center gap-4">
                  <Image quality={100} priority={true} width={80} height={40} alt="Imagem do trabalhador"
                  src={worker2}/>
                  <Input placeholder="Acenteiro" width="full" />
               </div>
               <div className="flex items-center gap-4">
                  <Image quality={100} priority={true} width={80} height={40} alt="Imagem do trabalhador"
                  src={worker2}/>
                  <Input placeholder="Encosteiro" width="full" />
               </div>
               <div className="flex items-center gap-4">
                  <Image quality={100} priority={true} width={80} height={40} alt="Imagem do trabalhador"
                  src={worker1}/>
                  <Input placeholder="Final" width="full" />
               </div>
            </div>

            <div className="w-fit flex justify-end items-center gap-4 my-8 2xl:my-10 mx-auto" >
               <Button text="Cancelar" />
               <Button text="Salvar" />
            </div>

         </div>




         {/* <Image
         alt="Figura do trabalhador"
         priority={true}
         quality={100}
         src={worker1} /> */}
      </Container>);
}

export default Workspace;