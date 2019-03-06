import { Base64 } from 'js-base64';
import { IRecipient, IUser } from '../types';

export default (recipient: IRecipient, user: IUser) => {
  const messageId = new Date().getUTCMilliseconds();
  const userFullName = user.firstName + ' ' + user.lastName;
  const firstName = recipient.firstName || '';
  const lastName = recipient.lastName || '';
  const recipientFullName = firstName + ' ' + lastName;

  const encode = (text: any) => {
    return '=?utf-8?B?' + Base64.encodeURI(text) + '?=';
  };

  return `From: ${encode(userFullName)} <${user.email}>
To: ${encode(recipientFullName)} <${recipient.email}>
Reply-To: <${user.email}>
Message-ID: ${messageId}
Date: ${messageId}
Subject: ${encode(recipient.data.subject)}
Content-Type: text/html; charset="UTF-8"

${recipient.data.content}`;
};
