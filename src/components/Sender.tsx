import { Button, Grid } from '@material-ui/core';
import SendEmailButton from 'src/components/SendEmailButton';

import React from 'react';

const Sender = () => {
  return (
    <Grid item={true} xs={12} style={{ textAlign: 'center' }}>
      <SendEmailButton />
    </Grid>
  );
};

export default Sender;
