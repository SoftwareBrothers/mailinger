import { cleanup } from '@testing-library/react';
import { UserContext } from 'context/user';
import { User } from 'models';
import React from 'react';
import { contextRender } from 'utils/testing';
import Bar from './Bar';

const dummyUser: User = {
  email: 'user@user.com',
  firstName: 'Test',
  googleId: 123456,
  lastName: 'User',
  name: 'user',
  token: {
    accessToken: 'abc123',
    expiresAt: new Date(),
    idToken: 'token',
  },
};

describe('Bar', () => {
  afterEach(cleanup);

  it('renders without errors', () => {
    contextRender()(<Bar />);
  });

  it('renders "hello" when user is logged in', () => {
    const userContext: UserContext = {
      removeUser: () => null,
      setUser: () => null,
      user: {
        ...dummyUser,
      },
    };

    const {
      render: { getByTestId },
    } = contextRender(userContext)(<Bar />);

    expect(getByTestId('toolbar').textContent).toContain('Hello');
  });

  it('renders "login" when user is not logged in', () => {
    const userContext: UserContext = {
      removeUser: () => null,
      setUser: () => null,
      user: undefined,
    };

    const {
      render: { getByTestId },
    } = contextRender(userContext)(<Bar />);

    expect(getByTestId('toolbar').textContent).toContain('Login');
  });
});
