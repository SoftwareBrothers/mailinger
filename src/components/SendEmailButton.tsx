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
          content: 'Masz te swoje 20k.',
          title: 'Wystaw fakturę',
        },
        email: 'pawel.lorenc@rst-it.com',
        firstName: 'Paweł',
        lastName: 'Lorenc',
      },
      {
        data: {
          content: 'Masz te swoje 30k.',
          title: 'Wystaw fakturę',
        },
        email: 'marek.firlejczyk@rst-it.com',
        firstName: 'Marek',
        lastName: 'Firlejczyk',
      },
      {
        data: {
          content: 'Masz te swoje 40k.',
          title: 'Wystaw fakturę',
        },
        email: 'szymon.poltorak@rst-it.com',
        firstName: 'Szymon',
        lastName: 'Półtorak',
      },
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