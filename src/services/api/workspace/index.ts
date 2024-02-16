import { AvailableWorkspace } from '@/types/AvailableWorkspace';
import { api } from '../axiosConfig';
import { CustomError } from "@/types/Error";
import { Workspace } from '@/types/Workspace';
import { Worker } from '@/types/Worker';

interface IAuth {
   data: WorkspaceRegister;
}

type AllWorkspaces = {
   numero: number;
   status?: string | undefined;
   funcionario_armador: Worker;
   funcionario_acenteiro: Worker;
   funcionario_encosteiro: Worker;
   funcionario_final: Worker;
}

type WorkspaceRegister = {
   numero: number;
   status?: string | undefined;
   funcionario_armador: number;
   funcionario_acenteiro: number;
   funcionario_encosteiro: number;
   funcionario_final: number;
}

const registerWorkspace = async (workspaceData: WorkspaceRegister): Promise<IAuth> => {
   try {
      const { data } = await api.post('/celulas', workspaceData);

      if (data) {
         console.log(data);
         return data;
      }

      throw new Error('Erro ao cadastrar célula.');
   } catch (error: any) {
      console.error(error);

      if (error.response?.status === 400) {
         const customError = {
            message: error.response.data,
            status: 400
         } as CustomError;
         throw customError;
      }

      throw { message: 'Erro ao cadastrar célula.' } as CustomError;
   }
};

const getAvailableWorkspace = async (): Promise<AvailableWorkspace> => {
   try {
      console.log("entrou no getAvailableWorkspace")
      const response = await api.get(`/celulas/disponivel`);
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

const getAllWorkspaces = async (): Promise<AllWorkspaces[]> => {
   try {
      const response = await api.get(`/celulas`);
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

export const WorkspaceService = {
   registerWorkspace, getAvailableWorkspace, getAllWorkspaces
};
