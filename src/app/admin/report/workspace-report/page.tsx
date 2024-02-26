"use client"

import { Container } from "@/components/container"
import Input from "@/components/input";
import Search from "../../components/search";
import { useQuery } from "react-query";
import { WorkspaceService } from "@/services/api/workspace";

const WorkspaceReport = () => {

   const { data: workspaces = [] } = useQuery(['workspaces'], () => WorkspaceService.getAllWorkspaces());
   console.log("Workspaces no Report: " + workspaces)

   if (!Array.isArray(workspaces)) {
      console.error("Workspaces não é uma array válida:", workspaces);
      return <div>Erro ao carregar os dados</div>;
   }

   return (

      <div className="h-full w-full flex flex-col items-center gap-6">

         <div className="flex flex-col gap-2 w-[90%] h-fit 2xl:h-fit 2xl:w-[90%] py-2 px-5 mt-4 bg-white rounded-lg drop-shadow-sm animate-slide-down duration-800 ease-in-out" >
            <div className="w-full flex items-center justify-between border-4 px-2" >
               <h1 className="font-bold text-3xl" >Células</h1>
               <Search width="4/4" placeholder="Pesquise o número" />
            </div>
         </div>

         <div className="w-full flex justify-center items-center" >
            <table className="w-[90%] shadow-xl animate-slide-down rounded-2xl" >
               <thead className="rounded-2xl">
                  <tr className="bg-g-red-600" >
                     <th scope="col" className="text-md font-bold text-white px-6 py-4 text-left w-2">Número </th>
                     <th scope="col" className="text-md font-bold text-white px-6 py-4 text-left w-8">Armador</th>
                     <th scope="col" className="text-md font-bold text-white px-6 py-4 text-left w-8">Assenteiro</th>
                     <th scope="col" className="text-md font-bold text-white px-6 py-4 text-left w-8">Encosteiro</th>
                     <th scope="col" className="text-md font-bold text-white px-6 py-4 text-left w-8">Final</th>
                     <th scope="col" className="text-md font-bold text-white px-6 py-4 text-center w-8">Ações</th>
                  </tr>
               </thead>
               <tbody>

                  {workspaces?.map((workspace, index) => (
                     <tr key={index} className="border-b border-slate-300 transition duration-300 ease-in-out hover:bg-slate-300/60 " >
                        <td className="px-6 py-4 whitespace-nowrap text-md font-bold text-gray-600 text-center">{workspace.numero}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md font-bold text-gray-600">{workspace.funcionario_armador?.nome}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md font-bold text-gray-600 ">{workspace.funcionario_acenteiro?.nome}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md font-bold text-gray-600 ">{workspace.funcionario_encosteiro?.nome}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md font-bold text-gray-600 ">{workspace.funcionario_final?.nome}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md font-bold text-gray-600 "><div className="flex gap-4 justify-center items-center" >
                           <button className="py-2 px-4 border bg-yellow-400 rounded-lg font-bold hover:cursor-pointer" >Editar</button>
                           <button className="py-2 px-4 border bg-red-500 rounded-lg font-bold">Excluir</button>
                        </div></td>
                     </tr>
                  ))}
               </tbody>

            </table>
         </div>



      </div>

   )
}

export default WorkspaceReport;