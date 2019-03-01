import * as React from 'react';
import GoogleLogin from 'react-google-login';
import { UserCtx } from "../../contexts/user.context";
import { createUserFromJson, IUser } from '../../types/user';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_ID || '';

const Login = () => {
  const [, setUser] = React.useContext(UserCtx);
  function responseGoogle(response: any) {
    const loggedUser: IUser = createUserFromJson(response);
    setUser(loggedUser);
  }
  return (
    <GoogleLogin
      clientId={CLIENT_ID}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      scope='profile email https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/drive'
    />
  );
};
export default Login;