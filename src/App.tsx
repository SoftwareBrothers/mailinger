import React from 'react';

import Bar from './components/Bar';
import Steps from './components/Stepper/Steps';
import { UserCtx } from './contexts/user.context';
import { useLocalStorage } from './hooks/localstorage.hook';
import { createUserFromLocalStorage, IUser } from './types';

import './App.css';

const hasTokenExpired = (userObj: IUser): boolean => {
  return userObj && userObj.token && new Date() > userObj.token.expiresAt;
};

function App() {
  const [user, setUser, removeUser] = useLocalStorage<IUser>(
    'user',
    null as any,
    createUserFromLocalStorage,
  );

  if (hasTokenExpired(user)) {
    removeUser();
  }

  return (
    <UserCtx.Provider value={[user, setUser, removeUser]}>
      <Bar />
      {user ? <Steps /> : null}
    </UserCtx.Provider>
  );
}

export default App;
