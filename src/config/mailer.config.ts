import 'dotenv/config';
import { createTransport } from 'nodemailer';

const transport = createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.USER_MAILER,
    pass: process.env.PASS_MAILER,
  },
});

export default transport;
