import * as React from 'react';
import GoogleLogin from 'react-google-login';
import { IUser } from '../../types/user';
import { UserCtx } from '../Bar';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID || '';

const Login = () => {
  const [, setUser] = React.useContext(UserCtx);
  function responseGoogle(response: any) {
    const {
      email,
      familyName: lastName,
      givenName: firstName,
      name,
      googleId,
    } = response.profileObj;
    const loggedUser: IUser = { email, lastName, firstName, name, googleId };
    setUser(loggedUser);
  }
  return (
    <GoogleLogin
      clientId={CLIENT_ID}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
    />
  );
};
export default Login;
