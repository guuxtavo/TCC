"use client"

import { Container } from "@/components/container"
import Input from "@/components/input";
import Search from "../../components/search";
import { useQuery } from "react-query";
import { AllWorkspaces, WorkspaceService } from "@/services/api/workspace";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import { useState } from "react";
import { Workspace } from "@/types/Workspace";
import EditWorkspaceModal from "../../components/editWorkspaceModal";

const WorkspaceReport = () => {

   const { data: workspaces = [], refetch } = useQuery(['workspaces'], () => WorkspaceService.getAllWorkspaces());
   const [filterNumero, setFilterNumero] = useState("");

   const filteredWorkspaces = workspaces.filter(workspace =>
      workspace.numero === Number(filterNumero)
   );

   const handleSearchChange = (value: string) => {
      setFilterNumero(value);
   };

   const [isEditWorkspaceModalOpen, setIsEditWorkspaceModalOpen] = useState(false);
   const [selectedWorkspace, setSelectedWorkspace] = useState<AllWorkspaces>();

   const openEditWorspaceOpen = (workspace: AllWorkspaces) => {
      setSelectedWorkspace(workspace)
      setIsEditWorkspaceModalOpen(true)
   }

   const closeEditWorkspaceModal = () => {
      refetch();
      setSelectedWorkspace(undefined)
      setIsEditWorkspaceModalOpen(false)
   }


   if (!Array.isArray(workspaces)) {
      console.error("Workspaces não é uma array válida:", workspaces);
      return <div>Erro ao carregar os dados</div>;
   }

   return (

      <div className="h-full w-full flex flex-col items-center gap-6">


         {
            isEditWorkspaceModalOpen && <EditWorkspaceModal isOpen={isEditWorkspaceModalOpen} onClose={closeEditWorkspaceModal} registerData={selectedWorkspace} />
         }

         <div className="flex flex-col gap-2 w-[90%] h-fit 2xl:h-fit 2xl:w-[90%] py-2 px-5 mt-4 bg-white rounded-lg drop-shadow-sm animate-slide-down duration-800 ease-in-out" >
            <div className="w-full flex items-center justify-between px-2" >
               <h1 className="font-bold text-3xl" >Células</h1>
               <Search width="4/4" placeholder="Pesquise o número" onChange={handleSearchChange} />
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

                  {workspaces
                     .filter((workspace) =>
                        filterNumero ? workspace.numero === Number(filterNumero) : true
                     )
                     .map((workspace, index) => (
                        <tr key={index} className="border-b border-slate-300 transition duration-300 ease-in-out hover:bg-slate-300/60 " >
                           <td className="px-6 py-4 whitespace-nowrap text-md font-bold text-gray-600 text-center">{workspace.numero}</td>
                           <td className="px-6 py-4 whitespace-nowrap text-md font-bold text-gray-600">{workspace.funcionario_armador?.nome}</td>
                           <td className="px-6 py-4 whitespace-nowrap text-md font-bold text-gray-600 ">{workspace.funcionario_assenteiro?.nome}</td>
                           <td className="px-6 py-4 whitespace-nowrap text-md font-bold text-gray-600 ">{workspace.funcionario_encosteiro?.nome}</td>
                           <td className="px-6 py-4 whitespace-nowrap text-md font-bold text-gray-600 ">{workspace.funcionario_final?.nome}</td>
                           <td className="px-6 py-4 whitespace-nowrap text-md font-bold text-gray-600 "><div className="flex gap-4 justify-center items-center" >
                              <button
                                 onClick={() => openEditWorspaceOpen(workspace)}
                                 className="py-1 px-4 border bg-yellow-400 rounded-lg font-bold hover:cursor-pointer " ><TiEdit size={25} /></button>
                              <button className="py-1 px-4 border bg-red-500 rounded-lg font-bold"><FaRegTrashAlt size={25} /></button>
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