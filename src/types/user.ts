import { Nullable } from './nullable';

export interface IUserToken {
  accessToken: string;
  expiresAt: Nullable<Date>;
  idToken: string;
}

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  googleId: number;
  name: string;
  token: IUserToken;
}

export interface IUserState {
  user: IUser | null;
}
