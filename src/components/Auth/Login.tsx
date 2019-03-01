import * as React from 'react';
import GoogleLogin from 'react-google-login';
import { UserCtx } from "../../contexts/user.context";
import { IUser, IUserToken } from '../../types/user';

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
    />
  );
};
export default Login;

function createUserFromJson(response: any): IUser {
  const obj: Partial<IUser> = {};

  obj.email = response.profileObj.email;
  obj.lastName = response.profileObj.familyName;
  obj.firstName = response.profileObj.givenName;
  obj.name = response.profileObj.name;
  obj.googleId = response.profileObj.googleId;
  obj.token = createUserTokenFromJson(response.tokenObj);

  return obj as IUser;
}

function createUserTokenFromJson(response: any): IUserToken {
  const obj: Partial<IUserToken> = {};

  obj.accessToken = response.access_token;
  obj.expiresAt = response.expires_at ? new Date(response.expires_at) : null;
  obj.idToken = response.id_token;

  return obj as IUserToken;

}