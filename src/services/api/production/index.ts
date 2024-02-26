import { Worker } from "@/types/Worker"
import { api } from '../axiosConfig'
import { CustomError } from "@/types/Error";
import { Production } from "@/types/Production";


interface IAuth {
   data: Production
}


const registerProduction = async (productData: Production): Promise<IAuth> => {
   try {
      const { data } = await api.post('/produtos', productData);

      if (data) {
         return data;
      }

      throw new Error('Erro ao cadastrar produto.');
   } catch (error: any) {

      if (error.response?.status === 400) {
         const customError = {
            message: error.response.data,
            status: 400
         } as CustomError;
         throw customError;
      }

      throw { message: 'Erro ao cadastrar produto.' } as CustomError;
   }
};

const getAllProductions = async (): Promise<Production[]> => {


   try {
      const response = await api.get('/producao');
      const data = response.data;


      if (data) {
         console.log("Data: " + data);
         return data;
      }

      return data

   } catch (error: any) {
      if (error.response?.status === 400) {
         const customError = {
            message: error.response.data,
            status: 400
         } as CustomError;
         throw customError;
      }

      throw { message: 'Erro ao listar produtos' } as CustomError;
   }
}

export const ProductionService = {
   registerProduction, getAllProductions
}
