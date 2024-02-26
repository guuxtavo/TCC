import * as Yup from 'yup';

export const changePasswordValidationSchema = Yup.object().shape({
   novaSenha: Yup.string().required("Campo Obrigatório"),
   confirmarSenha: Yup.string()
      .oneOf([Yup.ref('novaSenha')], 'Senhas devem ser iguais')
      .required("Campo Obrigatório")
});