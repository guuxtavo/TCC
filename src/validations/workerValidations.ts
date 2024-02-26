import * as Yup from 'yup';

export const workerValidationSchema = Yup.object().shape({
   nome: Yup.string().required("O campo 'Nome' é obrigatório"),
   cargo: Yup.string().required('Por favor, selecione um cargo.'),
   classificacao: Yup.string().required('Por favor, selecione uma classificação.'),
   login: Yup.string().required("O campo 'Login' é obrigatório"),
   dataNascimento: Yup.string().required("O campo 'Data de Nascimento' é obrigatório"),
})