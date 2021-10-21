import { sessionURL } from '../constants/urls.js';
import http from '../utils/http.js';

const loginRequest = (email: string, password: string) => {
  return http.post(sessionURL, {
    email: email,
    password: password,
  });
};

const logoutRequest = () => {
  return http.delete(sessionURL);
};

export { loginRequest, logoutRequest };
