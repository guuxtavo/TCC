import { FiUser } from 'react-icons/fi'

export function HeaderAdmin() {
   return (
      <div className="h-[10%] 2xl:h-[8%] w-full bg-g-red-600 drop-shadow-xl flex justify-between">
         <section className="bg-black h-[full] w-full flex justify-center items-center " >
            <p className="text-g-red-600 text-3xl font-extrabold" >Juntos vamos <span className="text-3xl font-extrabold" >+</span>  longe</p>
         </section>
         <div className="border-l border-black w-[20%] flex items-center justify-evenly">
            <FiUser 
            className='hover:text-white cursor-pointer'
            size={32}/>
            <span className='font-bold hover:text-white cursor-pointer'>Gustavo</span>
         </div>
      </div>
   )
}