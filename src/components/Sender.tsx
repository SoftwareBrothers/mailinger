import { Button, Grid } from '@material-ui/core';
import SendEmailButton from 'src/components/SendEmailButton';

import React from 'react';
import { MailTemplateCtx } from 'src/contexts/mail-template.context';
import { SpreadsheetCtx } from 'src/contexts/spreadsheet.context';
import { replaceVars } from './utils';

const Sender = () => {
  const [mailTemplate] = React.useContext(MailTemplateCtx);
  const [spreadsheet] = React.useContext(SpreadsheetCtx);
  // console.log(spreadsheet);
  // console.log(mailTemplate);

  const dataToSend = spreadsheet.usersData.map(user => {
    return {
      email: user.email,
      data: {
        subject: 'Wystaw fakturę',
        content: replaceVars(mailTemplate, spreadsheet)
      }
    };
  });

  console.log(dataToSend);

  return (
    <Grid item={true} xs={12} style={{ textAlign: 'center' }}>
      <SendEmailButton />
    </Grid>
  );
};

export default Sender;
