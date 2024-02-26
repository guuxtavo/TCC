import { ChangePasswordCard } from "@/components/change-password";
import { Header } from "@/components/header";

const ChangePassword = () => {
   return (
      <div className="mx-auto max-w-screen h-screen flex flex-col" >
         <Header />
         <ChangePasswordCard />
         
      </div>
   )
}

export default ChangePassword;