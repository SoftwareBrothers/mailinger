import { Button, Grid, TextField } from '@material-ui/core';
import Recipients from 'components/Sender/Recipients';
import { replaceVars } from 'components/utils';
import { EmailCtx, EmailData } from 'context/email';
import { MailTemplateCtx } from 'context/mail-template';
import { SpreadsheetCtx } from 'context/spreadsheet';
import { UserCtx } from 'context/user';
import { useStyles } from 'hooks/useStyles';
import React, { memo, useContext, useEffect, useMemo, useState } from 'react';
import send from 'services/MailSender';

const styles = {
  center: {
    textAlign: 'center' as any,
  },
  searchInput: {
    margin: 'auto',
  },
};

const prepareEmails = (
  recipients: any,
  mailTemplate: string,
  subject: string,
) => {
  const prepared: EmailData = recipients.map((userData: any) => {
    if (userData.send) {
      return {
        active: true,
        content: replaceVars(mailTemplate, userData),
        firstName: userData.firstName,
        lastName: userData.lastName,
        recipient: userData.email,
        status: 0,
        title: subject,
      };
    }
    return;
  });

  return prepared;
};

const Sender = () => {
  const [mailTemplate] = useContext(MailTemplateCtx);
  const { spreadsheet } = useContext(SpreadsheetCtx);
  const { data, setEmails } = useContext(EmailCtx);
  const { user } = useContext(UserCtx);
  const [subject, setSubject] = useState('Proszę o wystawienie Faktury');
  const classes = useStyles(styles);
  const recipients = spreadsheet.usersData.filter(
    (spreadsheetUserData: any) => spreadsheetUserData.send,
  );

  const update = (item: EmailData) => {
    const index = data.indexOf(item);

    if (index < 0) {
      return;
    }

    setEmails([...data.slice(0, index), item, ...data.slice(index + 1)]);
  };

  const sendEmails = () => {
    if (user !== undefined) {
      send(data.filter((item: EmailData) => item.active), user, update);
    }
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value);
  };

  const prep = useMemo(() => prepareEmails(recipients, mailTemplate, subject), [
    spreadsheet,
  ]);

  useEffect(() => {
    setEmails(prep);
  }, []);

  return (
    <Grid item={true} xs={12} className={classes.center}>
      <TextField
        id="standard-search"
        label="Email Title"
        type="search"
        margin="normal"
        fullWidth={true}
        className={classes.searchInput}
        value={subject}
        onChange={changeTitle}
      />
      <Recipients/>
      <Button variant="contained" color="primary" onClick={sendEmails}>
        Send
      </Button>
    </Grid>
  );
};

export default memo(Sender);
