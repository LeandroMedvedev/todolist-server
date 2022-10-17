import { boolean, object, string } from 'yup';

const updatedTaskSchema = object().shape({
  description: string(),
  completed: boolean(),
});

export default updatedTaskSchema;
