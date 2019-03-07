import Button from '@material-ui/core/Button';
import React, { FunctionComponent, memo, useContext } from 'react';
import { UserCtx } from '../contexts/user.context';
import { Recipient } from '../models';
import send from '../services/MailSender';

interface OwnProps {
  rcps: Recipient[];
}

const SendEmailButton: FunctionComponent<OwnProps> = ({ rcps }) => {
  const [user] = useContext(UserCtx);

  const click = () => {
    send(rcps, user);
  };

  return (
    <Button variant="contained" color="primary" onClick={click}>
      Send
    </Button>
  );
};

export default memo(SendEmailButton);
