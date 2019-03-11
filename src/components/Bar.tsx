import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { FunctionComponent, memo, useContext } from 'react';
import LogoutButton from '../components/Auth/LogoutButton';
import { UserCtx } from '../contexts/user.context';
import { useStyles } from '../hooks/useStyles';
import Login from './Auth/Login';
import Hello from './Hello';

const styles = {
  grow: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
    marginBottom: '1rem',
  },
};

const Bar: FunctionComponent = () => {
  const classes = useStyles(styles);
  const { user } = useContext(UserCtx);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {process.env.REACT_APP_NAME}
          </Typography>
          {user ? <Hello /> : <Login />}
          {user && <LogoutButton />}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default memo(Bar);
