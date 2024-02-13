import * as Yup from 'yup';

export const authValidationSchema = Yup.object().shape({
   cpf: Yup.string().required("O Campo 'CPF' é obrigatório"),
   senha: Yup.string().required("O Campo 'Senha' é obrigatório"),
   
})