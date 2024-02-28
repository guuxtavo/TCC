import Image from "next/image";
import { SiApachecouchdb } from "react-icons/si";
import mascoteSentada from "@/../public/mascote-hellen-sentada.png";

const Loading = () => {

   return (
      <div className="h-full w-full flex justify-center items-center gap-6" >
         <div className="w-2/4 flex justify-center gap-4 items-center" >
            {/* <Image
               priority={true}
               quality={100}
               alt="Imagem da boneca hellen sentada"
               width={90}
               height={60}
               src={mascoteSentada} /> */}
            <span className="animate-spin rounded-full h-10 w-10 border-r-4 border-g-red-600"></span>
            <p className="text-3xl font-bold" >Carregando...</p>
            <SiApachecouchdb size={35} className="animate-bounce" />
         </div>

      </div>
   )
}

export default Loading;