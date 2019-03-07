import { User, UserToken } from '../models';

export function createUserFromLocalStorage(storageData: User): User {
  const obj: Partial<User> = {
    ...storageData,
    token: createUserTokenFromLocalStorage(storageData.token),
  };

  return obj as User;
}

export function createUserTokenFromLocalStorage(
  storageData: UserToken,
): UserToken {
  return {
    ...storageData,
    // Date in LocalStorage is saved as string, we need to recover that back.
    expiresAt: new Date((storageData.expiresAt as any) as string),
  } as UserToken;
}

/* JSON transformers */
export function createUserFromJson(response: any): User {
  const obj: Partial<User> = {};

  obj.email = response.profileObj.email;
  obj.lastName = response.profileObj.familyName;
  obj.firstName = response.profileObj.givenName;
  obj.name = response.profileObj.name;
  obj.googleId = response.profileObj.googleId;
  obj.token = createUserTokenFromJson(response.tokenObj);

  return obj as User;
}

export function createUserTokenFromJson(response: any): UserToken {
  const obj: Partial<UserToken> = {};

  obj.accessToken = response.access_token;
  obj.expiresAt = response.expires_at && new Date(response.expires_at);
  obj.idToken = response.id_token;

  return obj as UserToken;
}
