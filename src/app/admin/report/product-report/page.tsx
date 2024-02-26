"use client"

import { ProductService } from "@/services/api/product";
import { useQuery } from "react-query";
import Search from "../../components/search";

const ProductReport = () => {

   const { data: products = [] } = useQuery(['products'], () => ProductService.getAllProducts());
   console.log("Products: " + products)

   return (

      <div className="h-full w-full flex flex-col items-center gap-6">

         <div className="flex flex-col gap-2 w-[90%] h-fit 2xl:h-fit 2xl:w-[90%] py-2 px-5 mt-4 bg-white rounded-lg drop-shadow-sm animate-slide-down duration-800 ease-in-out" >
            <div className="flex items-center justify-between px-2" >
               <h1 className="font-bold text-3xl" >Produtos</h1>
               <Search placeholder="Pesquise o produto" />
            </div>
         </div>

         <div className="w-full flex justify-center items-center" >
            <table className="w-[90%] shadow-xl animate-slide-down rounded-2xl" >
               <thead className="rounded-2xl">
                  <tr className="bg-g-red-600" >
                     <th scope="col" className="text-md font-bold text-white px-6 py-4 text-left w-2">Modelo</th>
                     <th scope="col" className="text-md font-bold text-white px-6 py-4 text-left w-8">Cor</th>
                     <th scope="col" className="text-md font-bold text-white px-6 py-4 text-left w-8">Pontuação</th>
                     <th scope="col" className="text-md font-bold text-white px-6 py-4 text-left w-8">Tipo</th>
                     <th scope="col" className="text-md font-bold text-white px-6 py-4 text-center w-10">Ações</th>
                  </tr>
               </thead>
               <tbody>

                  {products?.map((product, index) => (
                     <tr key={index} className="border-b border-slate-300 transition duration-300 ease-in-out hover:bg-slate-300/60 " >
                        <td className="px-6 py-4 whitespace-nowrap text-md font-bold text-gray-600 text-left">{product?.modelo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md font-bold text-gray-600">{product?.cor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md font-bold text-gray-600 ">{product?.pontuacao}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-md font-bold text-gray-600 ">{product?.tipo}</td>
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

export default ProductReport;