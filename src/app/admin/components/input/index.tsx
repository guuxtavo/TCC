type InputProps = {
   placeholder?: string,
   label?: string,
   width?: string,
   type?: string
}

const Input = ({ placeholder, label, width, type }: InputProps) => {

   return (
      <div className="w-full">
         {label &&
            <label
               className="text-xl font-bold block mb-2"
               htmlFor="">
               {label}
            </label>
         }
         <input
            placeholder={placeholder}
            className={`p-3 w-${width} h-16 rounded-lg text-gray-600 text-xl font-semibold bg-slate-100 border drop-shadow-md border-slate-400 outline-none transition-all duration-300 hover:scale-105`}
            type={type} />
      </div >
   );
}

export default Input;