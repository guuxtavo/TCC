import * as Yup from 'yup';

export const workerValidationSchema = Yup.object().shape({
   nome: Yup.string().required("O campo 'Nome' é obrigatório"),
   cargo: Yup.string().required('Por favor, selecione um cargo.').oneOf(['Armador', 'Final', 'Encosteiro', 'Acenteiro', "RH", "Gerente"], 'Cargo inválido.'),
   classificacao: Yup.string().required("O campo 'Classificação' é obrigatório"),
   login: Yup.string().required("O campo 'CPF' é obrigatório"),
   dataNascimento: Yup.string().required("O campo 'Data de Nascimento' é obrigatório"),
   role: Yup.boolean(),
})