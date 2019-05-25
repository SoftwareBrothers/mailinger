import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { SheetCtx } from 'contexts/sheet.context';
import { useStyles } from 'hooks/useStyles';
import React, { useContext } from 'react';

const styles = {
  center: {
    textAlign: 'center' as any,
  },
};

const Recipients = () => {
  const classes = useStyles(styles);
  const { sheet, setSheet } = useContext(SheetCtx);

  function onChange(
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) {
    const index = sheet.usersData.findIndex(
      (data: any) => data.email === event.target.value,
    );
    const data = Object.assign({}, sheet);
    data.usersData[index].send = checked;
    setSheet(data);
  }

  if (sheet) {
    return (
      <Grid container={true}>
        <Grid item={true} md={3} />
        <Grid item={true} xs={12} md={6} className={classes.center}>
          <List>
            {sheet.usersData.map((userData: any) => (
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
