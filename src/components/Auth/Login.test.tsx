import { cleanup } from '@testing-library/react';
import React from 'react';
import { contextRender } from 'utils/testing';
import Login from './Login';

describe('Login', () => {
  afterEach(cleanup);

  it('renders without errors', () => {
    contextRender()(<Login />);
  });
});
