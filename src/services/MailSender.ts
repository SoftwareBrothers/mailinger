import axios from 'axios';
import {IUser} from "../types";
import {IRecipient} from "../types/recipient";

const send = (recipients: IRecipient[], user: IUser) => {
  console.log(recipients);
  console.log(user);

  const data = 'RnJvbTogcGF3ZWwubG9yZW5jQHJzdC1pdC5jb20KVG86ICBtYXJlay5maXJsZWpjenlrQHJzdC1pdC5jb20KU3ViamVjdDogU3ViamVjdCBUZXh0CgpUaGUgbWVzc2FnZSB0ZXh0IGdvZXMgaGVyZQ==';

  axios.post('https://www.googleapis.com/gmail/v1/users/me/messages/send',
    { raw: data},
    { headers: {'Authorization': 'Bearer '+user.token.accessToken} }
    )
    .then(res => {
        console.log(res);
    }).catch((error) => {
      console.log(error);
  });
};

export default send;