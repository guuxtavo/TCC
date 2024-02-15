import { Container } from "@/components/container";
import Search from "../../components/search";

const ProductionReport = () => {
   return (
      <Container >
         <div className="flex items-center justify-between px-2" >
            <h1 className="font-bold text-3xl" >Relatório de Produção</h1>
            <Search />
         </div>
      </Container>
      
      );
}

export default ProductionReport;