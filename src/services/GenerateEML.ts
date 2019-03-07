import { Base64 } from 'js-base64';
import { Recipient, User } from '../types';

export default (recipient: Recipient, user: User) => {
  const messageId = new Date().getUTCMilliseconds();
  const userFullName = user.firstName + ' ' + user.lastName;
  const recipientFullName = recipient.firstName + ' ' + recipient.lastName;

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
