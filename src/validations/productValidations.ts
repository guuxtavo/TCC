import * as Yup from 'yup';

export const productValidationSchema = Yup.object().shape({
  modelo: Yup.string().required("O campo 'Modelo' é obrigatório"),
  cor: Yup.string().required("O campo 'Cor' é obrigatório"),
  tipo: Yup.string().required("O campo 'Tipo' é obrigatório"),
  pontuacao: Yup.number().transform((value, originalValue) => {
    const parsedValue = parseFloat(originalValue);
    return isNaN(parsedValue) ? undefined : parsedValue;
  }).required("O campo 'Pontuacao' é obrigatório"),
});
