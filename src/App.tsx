import React, { memo } from 'react';
import Bar from './components/Bar';
import Steps from './components/Stepper/Steps';
import { UserCtx } from './contexts/user.context';
import { useLocalStorage } from './hooks/localstorage.hook';
import { createUserFromLocalStorage, User } from './types';

const hasTokenExpired = (userObj: User): boolean => {
  return userObj && userObj.token && new Date() > userObj.token.expiresAt;
};

function App() {
  const [user, setUser, removeUser] = useLocalStorage<User>(
    'user',
    null as any,
    createUserFromLocalStorage,
  );

  if (hasTokenExpired(user)) {
    removeUser();
  }

  return (
    <UserCtx.Provider value={[user, setUser, removeUser]}>
      <div>
        <Bar />
      </div>
      {user ? <Steps /> : null}
    </UserCtx.Provider>
  );
}

export default memo(App);
