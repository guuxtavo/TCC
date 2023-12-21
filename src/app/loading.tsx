import { SiApachecouchdb } from "react-icons/si";

const Loading = () => { 

   return (
      <div className="h-screen w-full flex justify-center items-center gap-6 " >
         <span className="animate-spin rounded-full h-10 w-10 border-r-4 border-g-red-600"></span>
         <p className="text-3xl font-bold" >Carregando informações...</p>
         <SiApachecouchdb size={35} className="animate-bounce"/>
      </div>
   )
}

export default Loading;