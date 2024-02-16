"use client"

import { Container } from "@/components/container"
import Input from "@/components/input";
import Search from "../../components/search";
import { useQuery } from "react-query";
import { WorkspaceService } from "@/services/api/workspace";

const WorkspaceReport = () => {

   const { data: workspaces } = useQuery(['workers'], () => WorkspaceService.getAllWorkspaces());
   console.log(workspaces)

   return (

      <div className="h-full w-full flex flex-col items-center">

         <Container>
            <div className="flex items-center justify-between px-2" >
               <h1 className="font-bold text-3xl" >Relatório de Células</h1>
               <Search placeholder="Pesquisa o número" />
            </div>
         </Container>

         <Container>

            <table className="w-full">
               <thead>
                  <tr className="bg-slate-600" >
                     <th scope="col" className="text-sm font-bold text-white px-6 py-4 text-left">Código</th>
                     <th scope="col" className="text-sm font-bold text-white px-6 py-4 text-left">Número </th>
                     <th scope="col" className="text-sm font-bold text-white px-6 py-4 text-left">Status</th>
                     <th scope="col" className="text-sm font-bold text-white px-6 py-4 text-left">Armador</th>
                     <th scope="col" className="text-sm font-bold text-white px-6 py-4 text-center">Acenteiro</th>
                     <th scope="col" className="text-sm font-bold text-white px-6 py-4 text-center">Encosteiro</th>
                     <th scope="col" className="text-sm font-bold text-white px-6 py-4 text-center">Final</th>
                  </tr>
               </thead>
               <tbody>

                  {workspaces?.map((workspace, index) => (
                     <tr key={index} className="border-b-2 transition duration-300 ease-in-out hover:bg-gray-100" ><td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-600">
             
                   </td>




                     </tr>
                  ))}
               </tbody>

            </table>
         </Container>

      </div>

   )
}

export default WorkspaceReport;