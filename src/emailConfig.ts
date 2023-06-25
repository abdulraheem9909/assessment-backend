import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
const path = './dist/mails';
export const emailConfig = {
  transport:
    'smtps://abdulraheem9909@gmail.com:ryflvpyukcywlebx@smtp.gmail.com',

  defaults: {
    from: 'abdulraheem9909@gmail.com',
  },
  template: {
    dir: path,
    adapter: new HandlebarsAdapter(),
    options: {
      strict: false,
    },
  },
};
