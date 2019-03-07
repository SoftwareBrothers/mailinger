import axios from 'axios';
import { Nullable, User } from '../types';

const googleClient = axios.create({
  baseURL: 'https://www.googleapis.com',
});

const localUser: Nullable<string> = localStorage.getItem('user');

if (localUser) {
  const user: User = JSON.parse(localUser);
  if (user.token) {
    googleClient.defaults.headers.common.Authorization = `Bearer ${
      user.token.accessToken
    }`;
  }
}

export default googleClient;
