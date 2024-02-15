import { Worker } from "@/types/Worker"
import { api } from '../axiosConfig'
import { CustomError } from "@/types/Error";

export type RegisterWorker = {
   nome: string;
   login: string;
   password: string
   classificacao: string;
   cargo: string;
   role?: string;
   dataNascimento: string,
   primeiroAcesso: boolean,
}


interface IAuth {
   data: Worker
}

const registerWorker = async (workerData: RegisterWorker): Promise<IAuth> => {
   try {
      const { data } = await api.post('/auth/register', workerData);

      if (data) {
         console.log(data)
         return data;
      }

      throw new Error('Erro ao cadastrar funcionário.');
   } catch (error: any) {
      console.error(error);

      if (error.response?.status === 400) {
         const customError = {
            message: error.response.data,
            status: 400
         } as CustomError;
         throw customError;
      }

      throw { message: 'Erro ao cadastrar funcionário.' } as CustomError;
   }
};

const getWorkersID = async (cargo: string): Promise<{
   nome: any;
   id: any; value: number; label: string 
}[]> => {
   try {
      console.log("entrou no getWorkersID")
      const response = await api.get(`/funcionarios/cargo/${cargo}`);
      const data = response.data;

      const formattedData = data.map((worker: { id: any; nome: any; }) => ({
         value: worker.id,
         label: worker.nome,
      }));

      return formattedData;
   } catch (error: any) {
      console.error(error);

      if (error.response?.status === 400) {
         const customError = {
            message: error.response.data,
            status: 400,
         } as CustomError;
         throw customError;
      }

      throw { message: 'Erro ao obter lista de funcionários.' } as CustomError;
   }
}

export const WorkerService = {
   registerWorker, getWorkersID
}
