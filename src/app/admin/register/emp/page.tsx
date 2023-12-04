import { Container } from "../../components/container";
import { GrUserWorker } from "react-icons/gr";

export default function Employee() {
   return (

      <Container >
         <div className="w-full flex items-center justify-between border-4 border-red-600" >
            <div className="flex gap-8 items-center">
               <h1 className="text-4xl 2xl:text-5xl font-bold" >Funcionário</h1>
               <GrUserWorker size={35} />
            </div>
            <div className="w-fit mr-4" >
               <p className="font-bold text-g-red-600 text-xl" >Acesso Administrativo</p>
            </div>

         </div>


      </Container>
   )
}