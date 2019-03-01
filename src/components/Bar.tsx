import * as PropTypes from 'prop-types';
import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

import Login from './Auth/Login';
import Hello from './Hello';

const styles = createStyles({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  root: {
    flexGrow: 1,
  },
});

export interface IProps extends WithStyles<typeof styles> { }

export const UserCtx = React.createContext(null as any);

const ButtonAppBar = (props: IProps) => {
  const { classes } = props;
  const [user, setUser] = React.useState(null as any);

  return (
    <UserCtx.Provider value={[user, setUser]}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {process.env.REACT_APP_NAME}
            </Typography>
            {user ? <Hello /> : <Login />}
          </Toolbar>
        </AppBar>
      </div>
    </UserCtx.Provider>

  );
};

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(ButtonAppBar);
