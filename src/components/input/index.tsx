import { FieldError, UseFormRegister } from "react-hook-form";
import InputMask from 'react-input-mask';

type InputProps = {
  name: string,
  placeholder?: string,
  label?: string,
  width?: string,
  type?: string,
  register: UseFormRegister<any>,
  error?: FieldError | undefined
}

const Input = ({ placeholder, label, width, type, name, register, error }: InputProps) => {

  const obterDataAtual = () => {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    let mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    let dia = dataAtual.getDate().toString().padStart(2, '0');
  
    return `${ano}-${mes}-${dia}`;
  };

  
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-xl font-bold block mb-2" htmlFor={name}>
          {label}
        </label>
      )}
      {type === 'cpf' ? (
        <InputMask
          id={name}
          mask="999.999.999-99"  // Defina a máscara desejada
          maskChar={""}
          placeholder={placeholder}
          className={`p-3 w-${width} h-16 rounded-lg text-gray-600 text-xl font-semibold bg-slate-50 border drop-shadow-md border-slate-400 outline-none transition-all duration-300 hover:scale-95`}
          {...register(name)}
        />
      ) : (
        <input
          id={name}
          placeholder={placeholder}
          type={type}
          max={obterDataAtual()}
          className={`p-3 w-${width} h-16 rounded-lg text-gray-600 text-xl font-semibold bg-slate-50 border drop-shadow-md border-slate-400 outline-none transition-all duration-300 hover:scale-95`}  
          {...register(name)}
        />
      )}
      {error && <span className="text-red-600 text-base font-bold">{error?.message}</span>}
    </div>
  );
};

export default Input;