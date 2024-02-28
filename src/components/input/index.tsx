import { FieldError, UseFormRegister } from "react-hook-form";
import InputMask from 'react-input-mask';
import { MdErrorOutline } from "react-icons/md";

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

  const obterDataAtual = (type: string) => {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    let mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    let dia = dataAtual.getDate().toString().padStart(2, '0');

    if (type === 'min') {
      return `${ano - 100}-${mes}-${dia}`;
    } else {
      return `${ano - 18}-${mes}-${dia}`;
    }

  };


  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-xl font-bold block mb-2" htmlFor={name}>
          {label}
        </label>
      )}
      {type === 'cpf' ? (
        <div className="flex gap-1 items-center" >
          <InputMask
            id={name}
            mask="999.999.999-99"  // Defina a máscara desejada
            maskChar={""}
            placeholder={placeholder}
            className={`p-3 w-${width} h-16 rounded-lg text-xl text-black font-semibold bg-slate-50 border-2 drop-shadow-sm outline-none transition-all duration-300 hover:scale-95 ${error ? "border-red-500" : ''} `}
            {...register(name)}
          />
          {error && <MdErrorOutline color="red" size={25} />}
        </div>
      ) : (
        <div className="flex gap-1 items-center" >
          <input
            id={name}
            placeholder={placeholder}
            type={type}
            max={obterDataAtual('max')}
            min={obterDataAtual('min')}
            className={`p-3 w-${width} h-16 rounded-lg text-xl text-black font-semibold bg-slate-50 border-2 drop-shadow-sm outline-none transition-all duration-300 hover:scale-95  ${error ? "border-red-500" : ''}`}
            {...register(name)}
          />
          {error && <MdErrorOutline color="red" size={25} />}
        </div>
      )}
    </div>
  );
};

export default Input;