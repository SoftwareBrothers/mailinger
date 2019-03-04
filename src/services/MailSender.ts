import { Base64 } from 'js-base64';
import client from 'src/config/gmail.client';
import { IUser } from '../types';
import { IRecipient } from '../types/recipient';
import eml from './GenerateEML';

const send = (recipients: IRecipient[], user: IUser) => {
  for (const recipient of recipients) {
    const stream = eml(recipient, user);
    const data = Base64.encodeURI(stream);

    client
      .post('/gmail/v1/users/me/messages/send', { raw: data })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }
};

export default send;
