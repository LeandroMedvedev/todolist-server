import { object, string } from 'yup';

const loginUserSchema = object().shape({
  email: string().email().required(),
  password: string().required(),
});

export default loginUserSchema;
