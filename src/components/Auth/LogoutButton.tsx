import { Button } from '@material-ui/core';
import { UserCtx } from 'contexts/user.context';
import React, { memo, useContext } from 'react';

const LogoutButton = () => {
  const { removeUser } = useContext(UserCtx);

  return (
    <Button variant="contained" color="primary" onClick={removeUser}>
      Log out
    </Button>
  );
};

export default memo(LogoutButton);
