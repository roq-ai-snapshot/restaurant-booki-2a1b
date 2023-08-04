import * as yup from 'yup';

export const reservationValidationSchema = yup.object().shape({
  table_number: yup.number().integer().required(),
  reservation_time: yup.date().required(),
  guest_id: yup.string().nullable(),
  restaurant_id: yup.string().nullable(),
});
