import { Nullable } from './nullable';

export interface IUserToken {
  accessToken: string;
  expiresAt: Date;
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
  user: Nullable<IUser>;
}

/* LocalStorage transformers */
export function createUserFromLocalStorage(storageData: IUser): IUser {
  let obj: Partial<IUser> = {};
  obj = {
    ...storageData,
    token: createUserTokenFromLocalStorage(storageData.token)
  }

  return obj as IUser;
}

export function createUserTokenFromLocalStorage(storageData: IUserToken): IUserToken {
  return {
    ...storageData,
    // Date in LocalStorage is saved as string, we need to recover that back.
    expiresAt: new Date(storageData.expiresAt as any as string),
  } as IUserToken
}

/* JSON transformers */
export function createUserFromJson(response: any): IUser {
  const obj: Partial<IUser> = {};

  obj.email = response.profileObj.email;
  obj.lastName = response.profileObj.familyName;
  obj.firstName = response.profileObj.givenName;
  obj.name = response.profileObj.name;
  obj.googleId = response.profileObj.googleId;
  obj.token = createUserTokenFromJson(response.tokenObj);

  return obj as IUser;
}

export function createUserTokenFromJson(response: any): IUserToken {
  const obj: Partial<IUserToken> = {};

  obj.accessToken = response.access_token;
  obj.expiresAt = response.expires_at && new Date(response.expires_at);
  obj.idToken = response.id_token;

  return obj as IUserToken;
}