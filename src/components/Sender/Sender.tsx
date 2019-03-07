import { Button, Grid, TextField } from '@material-ui/core';
import React from 'react';
import { MailTemplateCtx } from '../../contexts/mail-template.context';
import { SpreadsheetCtx } from '../../contexts/spreadsheet.context';
import { UserCtx } from '../../contexts/user.context';
import send from '../../services/MailSender';
import { replaceVars } from '../utils';
import Recipients from './Recipients';

const Sender = () => {
  const [mailTemplate] = React.useContext(MailTemplateCtx);
  const [spreadsheet] = React.useContext(SpreadsheetCtx);
  const [user] = React.useContext(UserCtx);
  const [subject, setSubject] = React.useState('Proszę o wystawienie Faktury');

  const recipients = spreadsheet.usersData.filter((user: any) => user.send);
  const dataToSend = recipients.map((userData: any) => {
    if (userData.send) {
      return {
        email: userData.email,
        data: {
          subject,
          content: replaceVars(mailTemplate, userData),
        },
      };
    }
    return;
  });

  const SendEmails = () => {
    send(dataToSend, user);
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value);
  };

  return (
    <Grid item={true} xs={12} style={{ textAlign: 'center' }}>
      <TextField
        id="standard-search"
        label="Email Title"
        type="search"
        margin="normal"
        style={{ width: '90%', margin: 'auto' }}
        value={subject}
        onChange={changeTitle}
      />
      <Recipients />
      <Button
        variant="contained"
        color="primary"
        onClick={SendEmails}
        disabled={!recipients.length}
      >
        Send
      </Button>
    </Grid>
  );
};

export default Sender;
