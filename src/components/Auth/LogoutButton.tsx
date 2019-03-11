import { Button } from '@material-ui/core';
import React, { memo, useContext } from 'react';
import { UserCtx } from '../../contexts/user.context';

const LogoutButton = () => {
  const { removeUser } = useContext(UserCtx);

  return (
    <Button variant="contained" color="primary" onClick={removeUser}>
      Log out
    </Button>
  );
};

export default memo(LogoutButton);
