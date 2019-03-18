import { Base64 } from 'js-base64';
import client from '../config/gmail.client';
import { Recipient, User } from '../models';
import eml from './GenerateEML';

const send = (recipient: Recipient, user: User) => {
  if (recipient) {
    const stream = eml(recipient, user);
    const data = Base64.encodeURI(stream);

    try {
      client.post('/gmail/v1/users/me/messages/send', { raw: data });
    } catch (error) {
      console.warn(error);
    }
  }
};

export default send;
