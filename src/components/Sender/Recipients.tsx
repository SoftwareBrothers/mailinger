import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import React from 'react';
import { SpreadsheetCtx } from 'src/contexts/spreadsheet.context';

const Recipients = () => {
  const [spreadsheet, setSpreadsheet] = React.useContext(SpreadsheetCtx);

  function onChange(
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) {
    const index = spreadsheet.usersData.findIndex(
      data => data.email === event.target.value,
    );
    const data = Object.assign({}, spreadsheet);
    data.usersData[index].send = checked;
    setSpreadsheet(data);
  }

  if (spreadsheet) {
    return (
      <Grid container={true}>
        <Grid item={true} md={3} />
        <Grid item={true} xs={12} md={6} style={{ textAlign: 'center' }}>
          <List>
            {spreadsheet.usersData.map(userData => (
              <ListItem
                key={userData.email}
                role={undefined}
                dense={true}
                button={true}
              >
                <Checkbox
                  checked={userData.send}
                  tabIndex={-1}
                  disableRipple={true}
                  onChange={onChange}
                  value={userData.email}
                />
                <ListItemText primary={`${userData.email}`} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    );
  }
  return null;
};

export default Recipients;
