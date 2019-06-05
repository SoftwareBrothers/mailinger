import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { render } from '@testing-library/react';
import { UserContext, UserCtx } from 'context/user';
import React, { ReactElement } from 'react';
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
