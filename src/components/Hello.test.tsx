import { UserContext } from 'context/user';
import { User } from 'models';
import React from 'react';
import { cleanup } from 'react-testing-library';
import { contextRender } from 'utils/testing';
import Hello from './Hello';

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

describe('Hello', () => {
  afterEach(cleanup);

  it('renders without errors', () => {
    contextRender()(<Hello />);
  });

  it('renders "hello" and username when user is logged in', () => {
    const userContext: UserContext = {
      removeUser: () => null,
      setUser: () => null,
      user: {
        ...dummyUser,
      },
    };

    const {
      render: { getByTestId },
    } = contextRender(userContext)(<Hello />);

    expect(getByTestId('hello-content').textContent).toContain('user');
  });

  it('renders nothing when user is not logged in', () => {
    const userContext: UserContext = {
      removeUser: () => null,
      setUser: () => null,
      user: undefined,
    };

    const { render } = contextRender(userContext)(<Hello />);

    expect(render.container.textContent).toBeFalsy();
  });
});
