import { User } from '@/types/User'
import { api } from '../axiosConfig'

interface IAuth {
   token: string,
   user: User
}

interface ErrorResponse {
   response: {
      data?: {
         errors?: {
            default?: string
         }
      }
   }
}

const auth = async (login: string, password: string): Promise<IAuth | Error> => {

   try {
      const { data } = await api.post('/auth/login', { login, password })

      if (data) {
         return data
      }

      return new Error('Erro ao realizar login.')

   } catch (error) {
      return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao realizar login.')
   }

}

export const AuthService = {
   auth,
}