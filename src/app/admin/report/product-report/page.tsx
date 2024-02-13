import { Container } from "@/components/container"
import Input from "../../../../components/input";

const ProductReport = () => {
   return (

      <Container>
             <div className="flex items-center justify-between px-2" >
            <h1 className="font-bold text-3xl" >Relatório de Produtos</h1>
            <Input placeholder="Pesquisar Produto" width="full" />
         </div>


      </Container>
   )
}

export default ProductReport;