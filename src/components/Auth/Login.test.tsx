import React from 'react';
import { cleanup } from 'react-testing-library';
import { contextRender } from '../../utils/testing';
import Login from "./Login";

describe('Login', () => {
  afterEach(cleanup);

  it('renders without errors', () => {
    contextRender()(<Login />);
  });
});
