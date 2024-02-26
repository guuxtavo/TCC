"use client"

import { FiLayers } from "react-icons/fi";
import { TbReportSearch } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { FaPersonDigging } from "react-icons/fa6";
import { SiApachecouchdb } from "react-icons/si";
import { MdOutlineConstruction } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";
import Image from "next/image";
import { useState } from 'react'
import logoImg from "../../../../../public/Logo Hellen.png";
import { SidebarButton } from "../sidebarButton";
import Link from "next/link";
import { useAuth } from "@/contexts/auth";


export function Sidebar() {
   ""

   const { logout } = useAuth()
   const [cadastrosOpen, setCadastrosOpen] = useState(false);
   const [relatoriosOpen, setRelatoriosOpen] = useState(false);

   return (
      <aside className="w-[22%] 2xl:w-[20%] max-h-max bg-g-red-600">
         <div className="w-full h-full flex flex-col">
            <div className="h-[10%] 2xl:h-[8%] flex justify-center items-center">
               <Link href={"/admin"} >
                  <Image
                     className="mt-5 mx-auto hover"
                     src={logoImg}
                     alt="Logo do Site"
                     width={150}
                     height={120}
                     quality={100}
                     priority={true}
                  />
               </Link>

            </div>

            <section className="h-full pt-14">
               <SidebarButton
                  label="Cadastros"
                  onClick={() => (setCadastrosOpen(!cadastrosOpen))}
                  icon={<FiLayers size={30} />}
               />
               {cadastrosOpen && (
                  <>
                     <Link href={"/admin/register/worker"} >
                        <SidebarButton
                           label="Funcionário"
                           icon={<FaPersonDigging size={25} />} />
                     </Link>
                     <Link href={"/admin/register/product"} >
                        <SidebarButton
                           label="Produto"
                           icon={<SiApachecouchdb size={25} />} />
                     </Link>
                     <Link href={"/admin/register/workspace"} >
                        <SidebarButton
                           label="Célula"
                           icon={<MdOutlineConstruction size={25} />}
                        />

                     </Link>

                  </>
               )}

               <SidebarButton
                  label="Relatórios"
                  onClick={() => (setRelatoriosOpen(!relatoriosOpen))}
                  icon={<TbReportSearch size={30} />}
               />
               {relatoriosOpen && (
                  <>
                     <Link href={"/admin/report/workspace-report"} >
                        <SidebarButton label="Células" icon={<MdOutlineConstruction size={25} />} />
                     </Link>

                     <Link href={"/admin/report/worker-report"} >
                        <SidebarButton label="Funcionários" icon={<FaPersonDigging size={25} />} />
                     </Link>

                     <Link href={"/admin/report/product-report"} >
                        <SidebarButton label="Produtos" icon={<SiApachecouchdb size={25} />} />
                     </Link>

                     <Link href={"/admin/report/production-report"} >
                        <SidebarButton label="Produção" icon={<FaHandHoldingUsd size={25} />} />
                     </Link>

                  </>
               )}
            </section>
            <div className="h-14 py-4 mb-5 flex gap-5 justify-center items-center text-white bg-slate-800 hover:cursor-pointer hover:scale-105" onClick={logout} >

               <IoIosLogOut
                  size={30}
               />
               <p className="text-xl font-bold" >Sair</p>

            </div>
         </div>
      </aside>
   );
}