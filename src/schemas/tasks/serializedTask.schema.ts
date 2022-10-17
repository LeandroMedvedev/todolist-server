import { boolean, date, object, string } from 'yup';

const serializedTaskSchema = object().shape({
  // taskUuid: string().uuid().required(),
  description: string().required(),
  // createdAt: date().required(),
  // completed: boolean().required(),
});

export default serializedTaskSchema;
