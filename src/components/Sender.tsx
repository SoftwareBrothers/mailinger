import { Grid } from '@material-ui/core';
import React, { memo, useContext } from 'react';
import { MailTemplateCtx } from '../contexts/mail-template.context';
import { SpreadsheetCtx } from '../contexts/spreadsheet.context';
import { useStyles } from '../hooks/useStyles';
import { User } from '../models';
import SendEmailButton from './SendEmailButton';
import { replaceVars } from './utils';

const styles = {
  root: {
    textAlign: 'center' as any,
  },
};

const Sender = () => {
  const mailTemplate = useContext(MailTemplateCtx);
  const [spreadsheet] = useContext(SpreadsheetCtx);
  const classes = useStyles(styles);

  const dataToSend = spreadsheet.usersData.map((user: User) => {
    return {
      email: user.email,
      data: {
        subject: 'Wystaw fakturę',
        content: replaceVars(mailTemplate, spreadsheet),
      },
    };
  });

  console.log(dataToSend);

  return (
    <Grid item={true} xs={12} className={classes.root}>
      <SendEmailButton rcps={dataToSend} />
    </Grid>
  );
};

export default memo(Sender);
