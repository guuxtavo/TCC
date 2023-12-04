import { HeaderAdmin } from "./components/header";
import { Sidebar } from "./components/sidebar";
import Image from "next/image";
import MascoteImg from "../../../public/Mascote_Hellen-removebg-preview.png"
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Login',
  description: 'Tela para realizar o login',
}


const HomeAdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen flex">
      <Sidebar />
      <div className="w-[80%] h-full">
        <div className="h-full flex flex-col" >
          <HeaderAdmin />
          <main className="w-full h-full flex justify-center items-center relative overflow-hidden" >
            {children}
            <Image
              className="transform -rotate-12 absolute bottom-0 right-0 z-10 overflow-hidden"
              src={MascoteImg}
              height={350}
              quality={100}
              alt="Imagem do mascote Hellen"
              priority={true}
            />
          </main>
        </div>
      </div>

    </div>
  )
}

export default HomeAdminLayout;