import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { UserContext, UserCtx } from 'contexts/user.context';
import React, { ReactElement } from 'react';
import { render } from 'react-testing-library';
import theme from 'theme/theme';

const defaultUserContext: UserContext = {
  removeUser: jest.fn(),
  setUser: jest.fn(),
};

const contextRender = (userContext: UserContext = defaultUserContext) => (
  element: ReactElement<any>,
) => {
  const app = (
    <ThemeProvider theme={theme}>
      <UserCtx.Provider value={userContext}>{element}</UserCtx.Provider>
    </ThemeProvider>
  );

  return {
    render: render(app),
    userContext,
  };
};

export { contextRender };
