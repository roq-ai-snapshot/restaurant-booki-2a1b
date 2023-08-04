import * as yup from 'yup';

export const billingsValidationSchema = yup.object().shape({
  order_summary: yup.string().nullable(),
  total_value: yup.number().integer().nullable(),
  table_number: yup.string().nullable(),
});
