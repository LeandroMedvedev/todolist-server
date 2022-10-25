import transport from '../config/mailer.config';

import { ErrorHandler } from '../errors';

class MailerService {
  welcomeEmail = (userEmail: string) => {
    const mailOptions = {
      from: 'leandromedvedev@hotmail.com',
      to: userEmail,
      subject: "Confirmação de cadastro",
      text: `
      Bem-vindo ao To-Do List!
      Sua lista de tarefas em um único lugar,
      simples assim. :)(:
      `,
    };

    transport.sendMail(mailOptions, (error) => {
      if (error) {
        throw new ErrorHandler(424, "Email couldn't be sent");
      }
    });
  };
}

export default new MailerService();
