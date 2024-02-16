type SearchProps = {
   placeholder: string
}

const Search = ({ placeholder }: SearchProps) => {

   
   return (
      <div className="w-1/4" >
         <input type="text"
            placeholder={placeholder}
            className={"appearance-none p-3 h-16 w-full rounded-lg text-gray-600 text-xl font-semibold bg-slate-50 border drop-shadow-md border-slate-400 outline-none"}
         />


      </div>
   )
}


export default Search;