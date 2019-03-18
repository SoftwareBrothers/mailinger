import { Button, Grid, TextField } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { MailTemplateCtx } from '../../contexts/mail-template.context';
import { SpreadsheetCtx } from '../../contexts/spreadsheet.context';
import { UserCtx } from '../../contexts/user.context';
import { useStyles } from '../../hooks/useStyles';
import send from '../../services/MailSender';
import { replaceVars } from '../utils';
import Recipients from './Recipients';

const styles = {
  center: {
    textAlign: 'center' as any,
  },
  searchInput: {
    margin: 'auto',
    width: '90%',
  },
};

const Sender = (props: any) => {
  const [mailTemplate] = useContext(MailTemplateCtx);
  const { spreadsheet } = useContext(SpreadsheetCtx);
  const { user } = useContext(UserCtx);
  const [subject, setSubject] = useState('Proszę o wystawienie Faktury');
  const classes = useStyles(styles);
  const recipients = spreadsheet.usersData.filter((data: any) => data.send);
  const dataToSend = recipients.map((userData: any) => {
    if (userData.send) {
      return {
        data: {
          content: replaceVars(mailTemplate, userData),
          subject,
        },
        email: userData.email,
      };
    }
    return;
  });

  const sendEmails = () => {
    if (user !== undefined) {
      for (const recipient of dataToSend) {
        send(recipient, user);
        props.enqueueSnackbar(`Email to: ${recipient.email} was sended!`, {
          variant: 'success',
        });
      }
    }
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value);
  };

  return (
    <Grid item={true} xs={12} className={classes.center}>
      <TextField
        id="standard-search"
        label="Email Title"
        type="search"
        margin="normal"
        className={classes.searchInput}
        value={subject}
        onChange={changeTitle}
      />
      <Recipients />
      <Button variant="contained" color="primary" onClick={sendEmails}>
        Send
      </Button>
    </Grid>
  );
};

Sender.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(Sender);
