import base64url from "base64url";
import {IUser} from "../types";
import {IRecipient} from "../types/recipient";
import eml from "./GenerateEML"
import googleApi from "./GoogleApi";

const send = (recipients: IRecipient[], user: IUser) => {

  for (const recipient of recipients) {

    const webSafe64 = (base64: any) => {
      return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    };

    const stream = eml(recipient, user);
    const data = webSafe64(base64url(stream));

    googleApi.post('/gmail/v1/users/me/messages/send', {raw: data})
      .then(res => {
        console.log(res);
      }).catch((error) => {
      console.log(error);
    });

  }

};

export default send;