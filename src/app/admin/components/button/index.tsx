type ButtonProps = {
   text: string
}

export const Button = ({ text }: ButtonProps) => {
   return (
      <div>
         <button className={`px-8 py-3 w-40 rounded-md ${text === "Cancelar" ? "bg-slate-300 text-red-600 hover:text-white" : "bg-g-red-600 hover:bg-g-red-600/90 text-white"} font-bold text-lg 2xl:text-lg `}  >
            {text}
         </button>
      </div>
   )
}