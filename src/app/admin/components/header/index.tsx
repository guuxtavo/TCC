"use client"
import { useAuth } from '@/contexts/auth';
import { FiUser } from 'react-icons/fi'
import { IoIosLogOut } from "react-icons/io";

export function HeaderAdmin() {

   // const {user, logout } = useAuth();
   const { nome, logout } = useAuth();

   return (
      <div className="h-[10%] 2xl:h-[8%] w-full bg-g-red-600 drop-shadow-xl flex justify-between">
         <section className="bg-black h-[full] w-[80%] 2xl:w-[85%] flex justify-center items-center " >
            <p className="text-g-red-600 text-3xl font-extrabold" >Juntos vamos <span className="text-3xl font-extrabold" >+</span>  longe</p>
         </section>
         <div className="w-[20%] 2xl:w-[15%] flex justify-center items-center">
            <div className='flex items-center justify-around gap-6' >
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
         </div>
      </div>
   )
}