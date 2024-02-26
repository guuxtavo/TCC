import * as Yup from 'yup';

export const workspaceValidationSchema = Yup.object().shape({
   numero: Yup.number().transform((value, originalValue) => {
      const parsedValue = parseFloat(originalValue);
      return isNaN(parsedValue) ? undefined : parsedValue;
   }).required("O campo 'Numero' é obrigatório"),

   funcionario1: Yup.number().transform((value, originalValue) => {
      const parsedValue = parseFloat(originalValue);
      return isNaN(parsedValue) ? undefined : parsedValue;
   }).required("O campo 'Armador' é obrigatório"),

   funcionario2: Yup.number().transform((value, originalValue) => {
      const parsedValue = parseFloat(originalValue);
      return isNaN(parsedValue) ? undefined : parsedValue;
   }).required("O campo 'Assenteiro' é obrigatório"),
   
   funcionario3: Yup.number().transform((value, originalValue) => {
      const parsedValue = parseFloat(originalValue);
      return isNaN(parsedValue) ? undefined : parsedValue;
   }).required("O campo 'Encosteiro' é obrigatório"),

   funcionario4: Yup.number().transform((value, originalValue) => {
      const parsedValue = parseFloat(originalValue);
      return isNaN(parsedValue) ? undefined : parsedValue;
   }).required("O campo 'Final' é obrigatório"),


});