

import { HeaderUser } from "./components/header";


const HomeUserLayout = ({ children }: { children: React.ReactNode }) => {
   return (

      <main className="h-screen w-screen">
         <div className="w-full h-full">
            <div className="h-full flex flex-col" >
               <HeaderUser />
               <div className="w-full h-full relative" >
                  {children} 
                  
               </div>
            </div>
         </div>
      </main>

   )
}

export default HomeUserLayout