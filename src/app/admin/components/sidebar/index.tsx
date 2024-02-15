"use client"

import { FiLayers } from "react-icons/fi";
import { TbReportSearch } from "react-icons/tb";
import { IoIosHammer } from "react-icons/io";
import { SiApachecouchdb } from "react-icons/si";
import { LiaIndustrySolid } from "react-icons/lia";
import { FaHandHoldingUsd } from "react-icons/fa";
import Image from "next/image";
import { useState } from 'react'
import logoImg from "../../../../../public/Logo Hellen.png";
import { SidebarButton } from "../sidebarButton";
import Link from "next/link";


export function Sidebar() {

   const [cadastrosOpen, setCadastrosOpen] = useState(false);
   const [relatoriosOpen, setRelatoriosOpen] = useState(false);

   return (
      <aside className="w-[22%] 2xl:w-[20%] h-screen bg-g-red-600 drop-shadow-2xl ">
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
                           icon={<IoIosHammer size={25} />} />
                     </Link>
                     <Link href={"/admin/register/product"} >
                        <SidebarButton
                           label="Produto"
                           icon={<SiApachecouchdb size={25} />} />
                     </Link>
                     <Link href={"/admin/register/workspace"} >
                        <SidebarButton
                           label="Célula"
                           icon={<LiaIndustrySolid size={25} />}
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
                        <SidebarButton label="Células" icon={<LiaIndustrySolid size={25} />} />
                     </Link>

                     <Link href={"/admin/report/worker-report"} >
                        <SidebarButton label="Funcionários" icon={<IoIosHammer size={25} />} />
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
         </div>
      </aside>
   );
}