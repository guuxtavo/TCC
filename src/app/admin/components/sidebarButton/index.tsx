import { IconBaseProps } from "react-icons";

type SidebarButtonProps = {
   label: string;
   onClick?: () => void;
   icon: React.ReactElement<IconBaseProps>
};

export const SidebarButton = ({ label, onClick, icon }: SidebarButtonProps) => {

   // TESTE

   // const renderIcons = (label: string): React.ReactElement<IconBaseProps> => {
   //    switch (label) {
   //       case "Cadastros":
   //          return <FiLayers size={30} />;
   //       case "Relatórios":
   //          return <TbReportSearch size={30} />;
   //       case "Funcionário":
   //          return <IoIosHammer className="text-white" size={25} />;
   //       case "Produto":
   //          return <SiApachecouchdb className="text-white" size={25} />;
   //       case "Célula":
   //          return <LiaIndustrySolid className="text-white" size={25} />;
   //       default:
   //          return <GoDotFill className="text-white" />;
   //    }
   // };

   return (
      <div
         onClick={onClick}
         className={`w-full h-[10%] 2xl:h-[9%] text-xl text-white font-extrabold flex items-center gap-12 hover:bg-red-900  hover:cursor-pointer ${label === "Cadastros" || label === "Relatórios" ? " pl-8 border-y border-slate-300" : "transition-all ease-in-out hover:scale-110 pl-16 animate-slide-right  duration-500"
            }`}
      >
         {icon}
         {label}
      </div>

   );
};