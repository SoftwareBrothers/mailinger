import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import React, { ReactElement } from 'react';
import { render } from 'react-testing-library';
import { UserCtx } from '../contexts/user.context';
import theme from '../theme/theme';

const userContext = {
    removeUser: jest.fn(),
    setUser: jest.fn(),
};

const contextRender = () => (element: ReactElement<any>) => {
    const app = (
    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <UserCtx.Provider value={userContext}>{element}</UserCtx.Provider>
      </MuiThemeProvider>
    </ThemeProvider>
  );

  return {
      render: render(app),
      userContext,
  };
};

export { contextRender };
