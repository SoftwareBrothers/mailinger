import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import React from 'react';
import { SpreadsheetCtx } from 'src/contexts/spreadsheet.context';

const Recepients = () => {
  const [spreadsheet] = React.useContext(SpreadsheetCtx);
  if (spreadsheet) {
    return (
      <Grid container={true}>
        <Grid item={true} md={3} />
        <Grid item={true} xs={12} md={6} style={{ textAlign: 'center' }}>
          <List>
            {spreadsheet.usersData.map(user => (
              <ListItem
                key={user.email}
                role={undefined}
                dense={true}
                button={true}
              >
                <Checkbox checked={true} tabIndex={-1} disableRipple={true} />
                <ListItemText primary={`${user.email}`} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    );
  }
  return null;
};

export default Recepients;
