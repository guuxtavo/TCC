import * as Yup from 'yup';

export const authValidationSchema = Yup.object().shape({
   senha: Yup.string().required("O Campo 'Senha' é obrigatório"),
   cpf: Yup.string().required("O Campo 'CPF' é obrigatório"),
   
   
})