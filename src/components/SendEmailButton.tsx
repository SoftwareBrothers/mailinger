import Button from '@material-ui/core/Button';
import React, {FunctionComponent} from 'react';
import {UserCtx} from "../contexts/user.context";
import send from '../services/MailSender';
import {IRecipient} from "../types";

interface OwnProps {
  rcps: IRecipient[]
}

const SendEmailButton: FunctionComponent<OwnProps> = ({ rcps }) => {
  const [user] = React.useContext(UserCtx);

  const click = () => {
    send(rcps, user);
  };

  return (
    <Button variant="contained" color="primary" onClick={click}>
      Send
    </Button>
  );
};

export default SendEmailButton;
