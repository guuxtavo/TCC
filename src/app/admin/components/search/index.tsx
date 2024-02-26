type SearchProps = {
   placeholder: string
   width?: string
}

const Search = ({ placeholder, width }: SearchProps) => {

   
   return (
      <div className="w-fit" >
         <input type="text"
            placeholder={placeholder}
            className={`appearance-none p-3 h-14 w-${width ? width : 'full'} rounded-lg text-gray-600 text-xl font-semibold bg-slate-50 border-b-2 drop-shadow-sm border-slate-400 outline-none`}
         />
      </div>
   )
}


export default Search;