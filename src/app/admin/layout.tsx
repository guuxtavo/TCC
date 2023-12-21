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
    <main className="h-screen w-screen flex">
      <Sidebar />
      <div className="w-[80%] h-full">
        <div className="h-full flex flex-col" >
          <HeaderAdmin />
          <div className="w-full h-full flex justify-center relative overflow-hidden" >
            {children}
            <Image
              className="transform -rotate-12 absolute bottom-0 right-0 z-10 overflow-hidden"
              src={MascoteImg}
              height={380}
              quality={100}
              alt="Imagem do mascote Hellen"
              priority={true}
            />
          </div>
        </div>
      </div>

    </main>
  )
}

export default HomeAdminLayout;