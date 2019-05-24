import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { SpreadsheetCtx } from 'context/spreadsheet.context';
import { useStyles } from 'hooks/useStyles';
import React, { useContext } from 'react';

const styles = {
  center: {
    textAlign: 'center' as any,
  },
};

const Recipients = () => {
  const classes = useStyles(styles);
  const { spreadsheet, setSpreadsheet } = useContext(SpreadsheetCtx);

  function onChange(
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) {
    const index = spreadsheet.usersData.findIndex(
      (data: any) => data.email === event.target.value,
    );
    const data = Object.assign({}, spreadsheet);
    data.usersData[index].send = checked;
    setSpreadsheet(data);
  }

  if (spreadsheet) {
    return (
      <Grid container={true}>
        <Grid item={true} md={3} />
        <Grid item={true} xs={12} md={6} className={classes.center}>
          <List>
            {spreadsheet.usersData.map((userData: any) => (
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
