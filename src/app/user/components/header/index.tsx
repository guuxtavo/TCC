"use client"

import Image from "next/image";
import logoImg from "@/../public/Logo Hellen.png"
import { FiUser } from 'react-icons/fi'
import { IoIosLogOut } from "react-icons/io";
import { useAuth } from "@/contexts/auth";

export function HeaderUser() {
   const { nome, logout } = useAuth();
   return (
      <header className="max-h-20 w-full flex justify-between bg-g-red-600 drop-shadow-xl" >

         <div >
            <Image
               className="p-5 ml-5 items-center"
               src={logoImg}
               alt="Logo do Site"
               width={150}
               height={120}
               quality={100}
               priority={true}
            />
         </div>

         <div className='flex items-center justify-around gap-6 px-2'  >
            <div className='cursor-pointer hover:text-white flex items-center gap-4' >
               <FiUser
                  size={32} />
               <span className='font-bold hover:text-white'>{nome}</span>
            </div>

            <IoIosLogOut
               onClick={logout}
               className='hover:text-white cursor-pointer'
               size={30}
            />
         </div>

      </header>
   )
}