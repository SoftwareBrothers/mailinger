import Button from '@material-ui/core/Button';
import React from 'react';
import {UserCtx} from "../contexts/user.context";
import send from '../services/MailSender';
import {IRecipient} from "../types/recipient";

const SendEmailButton = () => {

  const [user] = React.useContext(UserCtx);

  const click = () => {
    const recipients: IRecipient[] = [
      {
        data: {
          content: 'Masz te swoje 60k. Tutaj wyświetlam jakieś polskie znaki, na przykład w słowie żółć.',
          subject: 'Wystaw fakturę',
        },
        email: 'pawel.lorenc@rst-it.com',
        firstName: 'Paweł',
        lastName: 'Lorenc',
      }
    ];

    send(recipients, user);
  };

  return (
    <Button variant="contained" color="primary" onClick={click}>
      Send
    </Button>
  );
};

export default SendEmailButton;