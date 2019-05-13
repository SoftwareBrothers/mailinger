import { Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { UserCtx } from 'contexts/user.context';
import { useStyles } from 'hooks/useStyles';
import React, { memo, useContext } from 'react';

const styles = (theme: Theme) => ({
  hello: {
    marginRight: theme.spacing(1),
  },
});

const Hello = () => {
  const { user } = useContext(UserCtx);
  const classes = useStyles(styles);

  if (!user) {
    return null;
  }

  return (
    <Typography
      variant="overline"
      color="inherit"
      className={classes.hello}
      data-testid="hello-content"
    >
      Hello, {user.name}
    </Typography>
  );
};

export default memo(Hello);
