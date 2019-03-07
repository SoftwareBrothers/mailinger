import { CssBaseline } from '@material-ui/core';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import React, { memo } from 'react';
import Bar from './components/Bar';
import Steps from './components/Stepper/Steps';
import { UserCtx } from './contexts/user.context';
import { useLocalStorage } from './hooks/localstorage.hook';
import { User } from './models';
import theme from './theme/theme';
import { createUserFromLocalStorage } from './transformers/user.transformer';

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
    <ThemeProvider theme={theme}>
      <UserCtx.Provider value={[user, setUser, removeUser]}>
        <CssBaseline />
        <Bar />
        {user ? <Steps /> : null}
      </UserCtx.Provider>
    </ThemeProvider>
  );
}

export default memo(App);
