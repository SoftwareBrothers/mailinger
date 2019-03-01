import { Base64 } from 'js-base64';
import {IUser} from "../types";
import {IRecipient} from "../types/recipient";

export default (recipient: IRecipient, user: IUser) => {

  const messageId = new Date().getUTCMilliseconds();
  const subject = Base64.encodeURI(recipient.data.subject);

  return `From: ${user.firstName} ${user.lastName} <${user.email}>
To: ${recipient.firstName} ${recipient.lastName} <${recipient.email}>
Reply-To: <${user.email}>
Message-ID: ${messageId}
Date: ${messageId}
Subject: =?utf-8?B?${subject}?=
Content-Type: text/html; charset="UTF-8"

${recipient.data.content}`;

};

