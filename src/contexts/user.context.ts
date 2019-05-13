import { User } from 'models';
import { createContext } from 'react';

export interface UserContext {
  readonly setUser: (user: User) => void;
  readonly removeUser: () => void;
  readonly user?: User;
}

export const UserCtx = createContext<UserContext>({
  removeUser: () => null,
  setUser: () => null,
});
