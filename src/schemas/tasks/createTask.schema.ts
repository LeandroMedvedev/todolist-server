import { object, string } from 'yup';

const createTaskSchema = object().shape({
  description: string().required(),
});

export default createTaskSchema;
