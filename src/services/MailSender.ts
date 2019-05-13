import client from 'config/gmail.client';
import { Base64 } from 'js-base64';
import { Recipient, User } from 'models';
import eml from './GenerateEML';

const send = (recipients: Recipient[], user: User) => {
  for (const recipient of recipients) {
    if (recipient) {
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
  }
};

export default send;
