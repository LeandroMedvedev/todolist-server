import { hashSync } from 'bcrypt';
import { object, string } from 'yup';

import { capitalize } from '../../utils';

const updateUserSchema = object().shape({
  name: string().transform((noun: string) => capitalize(noun)),
  email: string().email().lowercase(),
  password: string().transform((pwd: string) => hashSync(pwd, 10)),
});

export default updateUserSchema;
