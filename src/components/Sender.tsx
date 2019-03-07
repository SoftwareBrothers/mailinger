import { Grid } from '@material-ui/core';
import React, { memo, useContext } from 'react';
import { MailTemplateCtx } from '../contexts/mail-template.context';
import { SpreadsheetCtx } from '../contexts/spreadsheet.context';
import { IUser } from '../types';
import SendEmailButton from './SendEmailButton';
import { replaceVars } from './utils';

const Sender = () => {
  const mailTemplate = useContext(MailTemplateCtx);
  const [spreadsheet] = useContext(SpreadsheetCtx);

  const dataToSend = spreadsheet.usersData.map((user: IUser) => {
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
    <Grid item={true} xs={12} style={{ textAlign: 'center' }}>
      <SendEmailButton rcps={dataToSend} />
    </Grid>
  );
};

export default memo(Sender);
