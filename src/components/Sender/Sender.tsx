import { Button, Grid } from '@material-ui/core';
import SendEmailButton from 'src/components/Sender/SendEmailButton';

import React from 'react';
import { MailTemplateCtx } from 'src/contexts/mail-template.context';
import { SpreadsheetCtx } from 'src/contexts/spreadsheet.context';
import { replaceVars } from '../utils';
import Recepients from './Recepients';

const Sender = () => {
  const [mailTemplate] = React.useContext(MailTemplateCtx);
  const [spreadsheet] = React.useContext(SpreadsheetCtx);

  const dataToSend = spreadsheet.usersData.map(user => {
    return {
      email: user.email,
      data: {
        subject: 'Wystaw fakturę',
        content: replaceVars(mailTemplate, spreadsheet),
      },
    };
  });

  return (
    <Grid item={true} xs={12} style={{ textAlign: 'center' }}>
      <Recepients />
      <SendEmailButton rcps={dataToSend} />
    </Grid>
  );
};

export default Sender;
