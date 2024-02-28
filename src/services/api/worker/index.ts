import { Worker } from "@/types/Worker"
import { api } from '../axiosConfig'
import { CustomError } from "@/types/Error";

export type RegisterWorker = {
   nome: string;
   login: string;
   password: string
   classificacao: string;
   cargo: string;
   role: string;
   dataNascimento: string,
   primeiroAcesso: boolean,
}

export type EditWorker = {
   id?: number
   nome: string,
   login: string,
   classificacao: string,
   dataNascimento: string,
   cargo: string,
   role: string,
   celula?: {
      id?: number
   } | null
}

interface IAuth {
   data: Worker
}

const registerWorker = async (workerData: RegisterWorker): Promise<IAuth> => {
   try {
      const { data } = await api.post('/auth/register', workerData);

      if (data) {
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

const getAllWorkers = async (): Promise<Worker[]> => {
   try {
      const response = await api.get(`/funcionarios`);
      const data = response.data;

      return data;
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

const editWorker = async (workerData: EditWorker): Promise<Worker> => {
   try {
      console.log("Entrou no edit worker: " + JSON.stringify(workerData))
      const response = await api.put(`/funcionarios/${workerData.id}`, workerData);
      const data = response.data;

      if (data) {
         return data;
      }

      throw new Error('Erro ao editar funcionário.');
   } catch (error: any) {
      if (error.response?.status === 400) {
         const customError = {
            message: error.response.data,
            status: 400,
         } as CustomError;
         throw customError;
      }

      throw { message: 'Erro ao editar funcionário.' } as CustomError;
   }
}

const deleteWorker = async (worker: Worker) => {
   try {
      console.log("Entrou no deleteWorker")
      const response = await api.delete(`/funcionarios/${worker.id}`)
      console.log("Response :" + response )
      const data = response.data

      if (data) {
         return data
      }

   } catch (error: any) {
      if (error.response?.status === 400) {
         const customError = {
            message: error.response.data,
            status: 400,
         } as CustomError;
         throw customError;
      }

      throw { message: 'Erro ao excluir funcionário.' } as CustomError;
   }
}



export const WorkerService = {
   registerWorker, getWorkersID, getAllWorkers, editWorker, deleteWorker
}
