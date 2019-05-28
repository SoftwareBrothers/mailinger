import { EmailData } from 'context/email';
import { Base64 } from 'js-base64';
import { User } from 'models';

export default (recipient: EmailData, user: User) => {
  const messageId = new Date().getUTCMilliseconds();
  const userFullName = user.firstName + ' ' + user.lastName;
  const { firstName = '', lastName = '' } = recipient;
  const recipientFullName = `${firstName} ${lastName}`;

  const encode = (text: any) => {
    return '=?utf-8?B?' + Base64.encodeURI(text) + '?=';
  };

  return `From: ${encode(userFullName)} <${user.email}>
To: ${encode(recipientFullName)} <${recipient.recipient}>
Reply-To: <${user.email}>
Message-ID: ${messageId}
Date: ${messageId}
Subject: ${encode(recipient.title)}
Content-Type: text/html; charset="UTF-8"

${recipient.content}`;
};
