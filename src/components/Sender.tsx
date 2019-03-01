import { Button, Grid } from '@material-ui/core';
import React from 'react';

const Sender = () => {
  return (
    <Grid item={true} xs={12} style={{ textAlign: 'center' }}>
      <Button variant="contained" color="secondary" style={{ marginTop: 20 }}>
        Send
      </Button>
    </Grid>
  );
};

export default Sender;
