import Button from '@material-ui/core/Button';
import React, { memo, useContext } from 'react';
import GoogleLogin from 'react-google-login';
import { UserCtx } from '../../contexts/user.context';
import { User } from '../../models';
import { createUserFromJson } from '../../transformers/user.transformer';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID || '';

const Login = () => {
  const [, setUser] = useContext(UserCtx);

  function responseGoogle(response: any) {
    const loggedUser: User = createUserFromJson(response);
    setUser(loggedUser);
  }

  const renderButton = (renderProps: any) => (
    <Button variant="contained" color="primary" onClick={renderProps.onClick}>
      Login
    </Button>
  );

  return (
    <GoogleLogin
      clientId={CLIENT_ID}
      buttonText="Login"
      render={renderButton}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      scope="profile email https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/drive"
    />
  );
};
export default memo(Login);
