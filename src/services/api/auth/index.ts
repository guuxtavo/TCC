import { User } from '@/types/User'
import { api } from '../axiosConfig'
import { ChangePassword } from '@/types/ChangePassword'

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

const changePassword = async (password: ChangePassword) => {
   try {
      console.log("Entrou na função changePassword")
      const { data } = await api.post('/auth/change-password', password)

      if (data) {
         return data;
      }

      return new Error('Erro ao alterar senha.')
   } catch (error) {
      return new Error((error as ErrorResponse).response?.data?.errors?.default || 'Erro ao alterar senha.')
   }
}

export const AuthService = {
   auth, changePassword
}