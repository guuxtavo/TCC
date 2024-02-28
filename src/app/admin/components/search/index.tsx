type SearchProps = {
   placeholder: string;
   width?: string;
   onChange?: (searchText: string) => void; // Ajuste aqui
}

const Search = ({ placeholder, width, onChange }: SearchProps) => {
   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
         onChange(event.target.value);
      }
   };

   return (
      <div className="w-fit">
         <input
            type="text"
            placeholder={placeholder}
            className={`appearance-none p-3 h-14 w-${width ? width : 'full'} rounded-lg text-gray-600 text-xl font-semibold bg-slate-50 border-b-2 drop-shadow-sm border-slate-400 outline-none`}
            onChange={handleInputChange}
         />
      </div>
   );
};

export default Search;
