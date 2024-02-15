
import { Container } from "../../../../components/container";
import Input from "../../../../components/input";
import Search from "../../components/search";

const WorkerReport = () => {
   return (
      <Container >
         <div className="flex items-center justify-between px-2" >
            <h1 className="font-bold text-3xl" >Relatório de Funcionários</h1>
            <Search />
         </div>
      </Container>
      
      );
}

export default WorkerReport;