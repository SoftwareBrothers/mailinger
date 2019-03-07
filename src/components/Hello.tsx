import { Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React, { memo, useContext } from 'react';
import { UserCtx } from '../contexts/user.context';
import { useStyles } from '../hooks/useStyles';

const styles = (theme: Theme) => ({
  hello: {
    marginRight: theme.spacing.unit,
  },
});

const Hello = () => {
  const [user] = useContext(UserCtx);
  const classes = useStyles(styles);

  return (
    <Typography variant="overline" color="inherit" className={classes.hello}>
      Hello, {user.name}
    </Typography>
  );
};

export default memo(Hello);
