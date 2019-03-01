import axios from 'axios';
import base64url from "base64url";
import {IUser} from "../types";
import {IRecipient} from "../types/recipient";

const send = (recipients: IRecipient[], user: IUser) => {

  for (const recipient of recipients) {

    const messageId = new Date().getUTCMilliseconds();

    const webSafe64 = (base64: any) => {
      return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    };

    const stream = `From: ${user.firstName} ${user.lastName} <${user.email}>
To: ${recipient.firstName} ${recipient.lastName} <${recipient.email}>
Reply-To: <${user.email}>
Message-ID: ${messageId}
Date: ${messageId}
Subject: ${recipient.data.subject}
    
${recipient.data.content}`;

    const data = webSafe64(base64url(stream));

    axios.post('https://www.googleapis.com/gmail/v1/users/me/messages/send',
      {raw: data},
      {headers:
          {'Authorization': 'Bearer ' + user.token.accessToken}
      }
    )
      .then(res => {
        console.log(res);
      }).catch((error) => {
      console.log(error);
    });

  }

};

export default send;