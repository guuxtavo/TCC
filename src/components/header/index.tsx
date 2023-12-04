import Image from "next/image";
import logoImg from "../../../public/Logo Hellen.png"

export const Header = () => {
   return(
      <header className="max-h-20 w-full flex bg-g-red-600 drop-shadow-xl" >
         <Image
         className="p-5 ml-5 items-center"
         src={logoImg}
         alt="Logo do Site"
         width={150}
         height={120}
         quality={100}
         priority={true}
         />
      </header>
   )
}