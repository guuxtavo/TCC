import { Button } from "../button";
import { useEffect, useState } from "react";
import { ModalMessage } from "../messageModal";

type ConfirmModalProps<T> = {
   onClose: () => void;
   logout?: () => void,
   text: string;
   deleteData?: T | undefined;
   onDelete?: (data: T) => Promise<void>;
};

const ConfirmModal = <T,>({
   text,
   onClose,
   deleteData,
   logout,
   onDelete,
}: ConfirmModalProps<T>) => {
   const [showModalMessage, setShowModalMessage] = useState(false);
   const [modalType, setModalType] = useState("");
   const [message, setMessage] = useState("");

   useEffect(() => {
      if (showModalMessage) {
         const timer = setTimeout(() => {
            setShowModalMessage(false);
         }, 2500);

         return () => clearTimeout(timer);
      }
   }, [showModalMessage]);

   const handleDelete = async (data: T) => {
      try {
         if (onDelete) {
            await onDelete(data);
            setShowModalMessage(true);
            setModalType("success");
            setMessage("Item deletado com sucesso");
            onClose();
         }
      } catch (error: any) {
         console.log("Deu erro: " + JSON.stringify(error))
         setShowModalMessage(true);
         setModalType("error");
         setMessage(error.message);
      }
   };

   return (
      <div className="fixed top-0 left-0 w-full h-full bg-transparent/50 flex justify-center items-center z-10">
         {showModalMessage && (
            <ModalMessage message={message} type={modalType} />
         )}
         <div className="h-1/4 w-1/4 bg-slate-50 drop-shadow-lg rounded-lg flex flex-col justify-evenly animate-slide-down">
            <span className="text-lg font-bold text-center">{text}</span>
            <div className="w-full flex justify-center items-center gap-4">
               <button
                  onClick={onClose}
                  className="p-4 bg-slate-300 rounded-md w-1/4"
               >
                  Voltar
               </button>
               <button
                  onClick={deleteData != null ? () => handleDelete(deleteData) : logout}
                  className="p-4 bg-g-red-600 rounded-md w-1/4 text-white"
               >{`${deleteData != null ? "Excluir" : "Sair"}`}</button>
            </div>
         </div>
      </div>
   );
};

export default ConfirmModal;