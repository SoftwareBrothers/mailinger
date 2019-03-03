import { AxiosInstance } from 'axios';
import googleClient from './google.client';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'text/html; charset="UTF-8"',
};

const gmailClient: AxiosInstance = Object.assign(
  { defaults: { headers } },
  googleClient,
);

export default gmailClient;
