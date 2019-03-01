import Typography from '@material-ui/core/Typography';
import React from 'react';
import { UserCtx } from './Bar';

const Hello = () => {
  const [user] = React.useContext(UserCtx);

  return (
    <Typography variant="overline" color="inherit">
      Hello, {user.name}
    </Typography>
  )
}

export default Hello;