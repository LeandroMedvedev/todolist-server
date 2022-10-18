import { object, string } from 'yup';

const serializedUserLoginSchema = object().shape({
  userUuid: string().uuid().required(),
  name: string().required(),
  email: string().email().required(),
});

export default serializedUserLoginSchema;
