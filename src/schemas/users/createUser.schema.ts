import { hashSync } from 'bcrypt';
import { object, string } from 'yup';

import { capitalize } from '../../utils';

const createUserSchema = object().shape({
  name: string()
    .transform((noun: string) => capitalize(noun))
    .required(),
  email: string().email().lowercase().required(),
  password: string()
    .transform((pwd: string) => hashSync(pwd, 10))
    .required(),
});

export default createUserSchema;
