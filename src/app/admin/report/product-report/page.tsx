import { Container } from "@/components/container"
import Search from "../../components/search";

const ProductReport = () => {
   return (

      <div className="h-full w-full flex flex-col items-center">

         <Container>
            <div className="flex items-center justify-between px-2" >
               <h1 className="font-bold text-3xl" >Relatório de Produtos</h1>
               <Search placeholder="Pesquise Produtos" />
            </div>
         </Container>

         <Container>
            <h1 className="font-bold text-2xl" >Listagem</h1>

         </Container>
      </div>

   )
}

export default ProductReport;