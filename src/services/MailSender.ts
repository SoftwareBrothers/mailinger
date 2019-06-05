import client from 'config/gmail.client';
import { EmailData, EmailStatus } from 'context/email';
import { Base64 } from 'js-base64';
import { User } from 'models';
import eml from './GenerateEML';

const send = (recipients: EmailData[], user: User, updater: any) => {
  for (const recipient of recipients) {
    if (recipient) {
      const stream = eml(recipient, user);
      const data = Base64.encodeURI(stream);

      setStatus(recipient, EmailStatus.PENDING, updater);

      client
        .post('/gmail/v1/users/me/messages/send', { raw: data })
        .then(res => {
          setStatus(recipient, EmailStatus.SENT, updater);
        })
        .catch(error => {
          setStatus(recipient, EmailStatus.ERROR, updater);
        });
    }
  }
};

const setStatus = (recipient: EmailData, status: EmailStatus, updater: any) => {
  recipient.status = status;
  updater(recipient);
};

export default send;
