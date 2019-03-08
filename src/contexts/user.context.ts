import { createContext } from 'react';
import { User } from '../models';

export interface UserContext {
  readonly setUser: (user: User) => void;
  readonly removeUser: () => void;
  readonly user?: User;
}

export const UserCtx = createContext<UserContext>({
  removeUser: () => null,
  setUser: () => null,
});
