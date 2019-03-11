import React from 'react';
import { cleanup, fireEvent } from 'react-testing-library';
import { contextRender } from '../../utils/testing';
import LogoutButton from './LogoutButton';

describe('LogoutButton', () => {
  afterEach(cleanup);

  it('renders without errors', () => {
    contextRender()(<LogoutButton />);
  });

  it('calls "setUser" when button is clicked', () => {
    const {
      render: { getByText },
      userContext: { removeUser },
    } = contextRender()(<LogoutButton />);

    fireEvent.click(getByText('Log out'));

    expect(removeUser).toHaveBeenCalledTimes(1);
  });
});
