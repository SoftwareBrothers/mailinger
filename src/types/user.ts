export const STORE_USER = 'STORE_USER';

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  googleId: number;
  name: string;
}

export interface IUserState {
  user: IUser | null;
}

export interface ISetUserAction {
  type: typeof STORE_USER;
  payload: IUser;
}

export type UserActionTypes = ISetUserAction;
