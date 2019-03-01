import Typography from '@material-ui/core/Typography';
import { createContext, useState } from 'react';
import * as React from 'react';
import GoogleLogin from 'react-google-login';
import { IUser } from '../../types/user';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID || '';

export const UserCtx = createContext<IUser>(null as any);

const Login = () => {
  const [user, setUser] = useState<IUser>(null as any);

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
  if (user) {
    return (
      <Typography variant="overline" color="inherit">
        Hello, {user.name}
      </Typography>
    );
  }
  return (
    <UserCtx.Provider value={user}>
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </UserCtx.Provider>
  );
};
export default Login;
