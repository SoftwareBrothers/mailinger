import {IUser} from "../types";
import {IEmailMeta} from "../types/email";
import {IRecipient} from "../types/recipient";

const send = (data: IEmailMeta[], recipients: IRecipient[], user: IUser) => {
  console.log(user);
};

export default send;