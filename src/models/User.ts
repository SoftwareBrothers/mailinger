import { UserToken } from './UserToken';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  googleId: number;
  name: string;
  token: UserToken;
}
