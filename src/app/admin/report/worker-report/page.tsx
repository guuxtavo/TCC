"use client"

import EditWorkerModal from "@/app/admin/components/editWorkerModal";
import { WorkerService } from "@/services/api/worker";
import { Worker } from "@/types/Worker";
import { format } from 'date-fns';
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import ReactPaginate from "react-paginate";
import { useQuery } from "react-query";
import Search from "../../components/search";
import ConfirmModal from "@/components/confirmModal";

const WorkerReport = () => {

   const [currentPage, setCurrentPage] = useState(0);
   const [isEditWorkerModalOpen, setIsEditWorkerModalOpen] = useState<boolean>(false);
   const [selectedWorker, setSelectedWorker] = useState<Worker>();
   const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
   const [searchText, setSearchText] = useState<string>("");
   const { data: workers = [], refetch } = useQuery(['workers'], () => WorkerService.getAllWorkers());

   const getPaginatedData = () => {
      const offset = currentPage * workersPerPage;
      return workers.slice(offset, offset + workersPerPage);
   };

   const filteredWorkers = Array.isArray(workers)
      ? workers.filter(worker =>
         searchText.toLowerCase().split(" ").every(part =>
            worker.nome?.toLowerCase().includes(part)
         )
      )
      : [];

   const handleChange = (searchText: string) => {
      setSearchText(searchText);
      setCurrentPage(0); // Resetando a página ao alterar a pesquisa
   };

   const openEditWorkerModal = (worker: Worker) => {
      setSelectedWorker(worker);
      setIsEditWorkerModalOpen(true);

   };

   const closeEditWorkerModal = () => {
      refetch();
      setSelectedWorker(undefined)
      setIsEditWorkerModalOpen(false)
   };

   const openConfirmDeleteModal = (worker: Worker) => {
      setSelectedWorker(worker)
      setIsConfirmDeleteModalOpen(true)
   }

   const closeConfirmDeleteModal = () => {
      refetch()
      setIsConfirmDeleteModalOpen(false)
   }

   const workersPerPage = 6; // Número de funcionários por página


   const offset = currentPage * workersPerPage;
   const currentWorkers = Array.isArray(workers) ? workers.slice(offset, offset + workersPerPage) : [];

   const pageCount = Math.ceil(filteredWorkers.length / workersPerPage);

   const handlePageClick = ({ selected: selectedPage }: { selected: number }) => {
      const newOffset = selectedPage * workersPerPage;
      if (newOffset < filteredWorkers.length) {
         setCurrentPage(selectedPage);
      }
   };

   const formatDateISOToUTC = (dateISO: any) => {
      if (dateISO == null || dateISO == undefined || dateISO == "") {
         return new Date(0);  // Retorna a data de referência (1970-01-01)
      }

      var dataArray = dateISO.split('-');
      return new Date(dataArray[0], dataArray[1] - 1, dataArray[2]);
   }
   return (

      <div className="h-full w-full flex flex-col items-center gap-6">

         {isConfirmDeleteModalOpen && (
            <ConfirmModal<Worker>
               deleteData={selectedWorker}
               text="Deseja excluir esse item ?"
               onClose={closeConfirmDeleteModal}
               onDelete={WorkerService.deleteWorker}
            />
         )}

         {
            isEditWorkerModalOpen && <EditWorkerModal onClose={closeEditWorkerModal} registerData={selectedWorker} />
         }

         <div className="flex flex-col gap-2 w-[90%] h-fit 2xl:h-fit 2xl:w-[90%] py-2 px-5 mt-4 bg-white rounded-lg drop-shadow-md animate-slide-down duration-800 ease-in-out" >
            <div className="flex items-center justify-between px-2" >
               <h1 className="font-bold text-3xl" >Funcionários</h1>
               <Search placeholder="Pesquisar o nome" onChange={handleChange} />
            </div>
         </div>

         <div className="w-full flex justify-center items-center" >
            <table className="w-[90%] shadow-xl animate-slide-down rounded-2xl" >
               <thead className="rounded-2xl">
                  <tr className="bg-g-red-600" >
                     <th scope="col" className="text-md font-bold text-white px-6 py-4 text-left w-4">Nome</th>
                     <th scope="col" className="text-md font-bold text-white px-6 py-4 text-left w-8">Cargo</th>
                     <th scope="col" className="text-md font-bold text-white px-6 py-4 text-left w-8">Nascimento</th>
                     <th scope="col" className="text-md font-bold text-white px-6 py-4 text-left w-8">Classificação</th>
                     <th scope="col" className="text-md font-bold text-white px-6 py-4 text-left w-8">Célula</th>
                     <th scope="col" className="text-md font-bold text-white px-6 py-4 text-center w-10">Ações</th>
                  </tr>
               </thead>
               <tbody>

                  {filteredWorkers.slice(offset, offset + workersPerPage).map((worker, index) => (
                     <tr key={index}
                        className="border-b border-slate-300 transition duration-300 ease-in-out hover:bg-slate-300/60" >
                        <td className="px-6 py-3 whitespace-nowrap text-md font-bold text-gray-600 text-left">{worker?.nome}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-md font-bold text-gray-600">{worker?.cargo}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-md font-bold text-gray-600 ">{worker?.dataNascimento ? format(formatDateISOToUTC(worker.dataNascimento), 'dd/MM/yyyy') : ''}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-md font-bold text-gray-600">{worker?.classificacao}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-md font-bold text-gray-600">{worker?.celula?.numero == null ? "Indefinida" : worker?.celula?.numero}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-md font-bold text-gray-600 "><div className="flex gap-4 justify-center items-center" >
                           <button
                              onClick={() => openEditWorkerModal(worker)}
                              className="py-1 px-4 border bg-yellow-400 rounded-lg font-bold hover:cursor-pointer " ><TiEdit size={25} /></button>
                           <button
                              onClick={() => openConfirmDeleteModal(worker)}
                              className="py-1 px-4 border bg-red-500 rounded-lg font-bold"><FaRegTrashAlt size={25} /></button>
                        </div></td>

                     </tr>
                  ))}
               </tbody>

            </table>
         </div>
         <div className="pagination-container">
            <ReactPaginate
               className="flex gap-4 text-black font-bold text-lg border-b-4 border-g-red-600 drop-shadow-md animate-slide-down"
               previousLabel={"Anterior"}
               nextLabel={"Próximo"}
               breakLabel={"..."}
               pageCount={pageCount}
               marginPagesDisplayed={2}
               pageRangeDisplayed={5}
               onPageChange={handlePageClick}
               containerClassName={"pagination"}
               activeClassName={"active"}
            />
         </div>
      </div>

   )
}

export default WorkerReport;