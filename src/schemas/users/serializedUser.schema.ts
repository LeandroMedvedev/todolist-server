import { array, boolean, object, string } from 'yup';
import serializedTaskSchema from '../tasks/serializedTask.schema';

const serializedUserSchema = object().shape({
  userUuid: string().uuid().required(),
  name: string().required(),
  email: string().email().required(),
  isAdmin: boolean().required(),
  tasks: array().of(serializedTaskSchema).optional(),
});

export default serializedUserSchema;
