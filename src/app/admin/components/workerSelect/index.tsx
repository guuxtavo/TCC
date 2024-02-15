import { WorkerService } from '@/services/api/worker';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { useQuery } from 'react-query';

type WorkerSelectProps = {
  workers: { id: number, nome: string }[]
  name: string;
  cargo: string;
  register: UseFormRegister<any>; // Adicione isso às suas propriedades
  error?: FieldError | undefined; // Adicione isso também se quiser lidar com erros
};

const WorkerSelect = ({ cargo, error, register, name, workers }: WorkerSelectProps) => {

  return (
    <div className="w-3/4">
      <select
        {...register(name)}

        className={"appearance-none p-3 h-16 w-full rounded-lg text-gray-600 text-xl font-semibold bg-slate-50 border drop-shadow-md border-slate-400 outline-none"}
      >
        <option value="">{`Selecione um ${cargo}`}</option>
        {workers?.map((worker) => (
          <option key={worker.id} value={worker.id} >{worker.nome}</option>

        ))}
      </select>
      {error && (
        <span className="text-red-600 text-base font-bold">{error?.message}</span>
      )}
    </div>
  );
};

export default WorkerSelect;