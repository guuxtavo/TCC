import React from 'react';
import { FieldValues, UseFormReset } from 'react-hook-form';

type ButtonProps = {
   text: string;
   reset?: UseFormReset<FieldValues>;
   handleReset?: () => void;
   type?: 'reset' | 'button' | 'submit';
};

export const Button = ({ text, reset, type, handleReset }: ButtonProps) => {

   return (
      <div>
         <button
            type={type}
            className={`px-8 py-3 w-40 rounded-md ${text === 'Cancelar'
               ? 'bg-slate-300 text-red-600 hover:text-white'
               : 'bg-g-red-600 hover:bg-g-red-600/90 text-white'
               } font-bold text-lg 2xl:text-lg `}
            onClick={
               handleReset}
         >
            {text}
         </button>
      </div>
   );
};