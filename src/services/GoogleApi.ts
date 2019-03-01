import axios from 'axios';
import {IUser} from "../types";

const headers = {
  common: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'content=text/html charset=UTF-8'
  }
};

const googleApi = axios.create({
  baseURL: 'https://www.googleapis.com',
  headers
});

const user:IUser = JSON.parse(localStorage.getItem('user'));
if (user && user.token) {
  googleApi.defaults.headers.common.Authorization = `Bearer ${user.token.accessToken}`;
}

export default googleApi;