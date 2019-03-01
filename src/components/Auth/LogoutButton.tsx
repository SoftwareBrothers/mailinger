import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { UserCtx } from 'src/contexts/user.context';

const logoutButton = () => {
  const [, , removeUser] = useContext(UserCtx);
  return (
    <Button variant="outlined" color="inherit" onClick={removeUser}>Log out</Button>
  )
}

export default logoutButton;