import {IUser} from "../types";
import {IRecipient} from "../types/recipient";

export default (recipient: IRecipient, user: IUser) => {

  const messageId = new Date().getUTCMilliseconds();

  return `From: ${user.firstName} ${user.lastName} <${user.email}>
To: ${recipient.firstName} ${recipient.lastName} <${recipient.email}>
Reply-To: <${user.email}>
Message-ID: ${messageId}
Date: ${messageId}
Subject: ${recipient.data.subject}
    
${recipient.data.content}`;

};

