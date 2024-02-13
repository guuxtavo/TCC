type ModalMessageProps = {
   message: string;
   type: string
}

export const ModalMessage = ({ message, type} : ModalMessageProps) => {
   return (
      <section className={`absolute right-0 left-0 ${type == "success" ? 'bg-green-200 text-green-800' : 'bg-red-300 text-red-800 '} font-bold rounded-lg p-4 h-14 w-fit flex justify-center items-center mx-auto animate-slide-down`} >
         <p>{message}</p>
      </section>
   )
}