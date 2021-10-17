import { sessionURL } from '../constants/urls';
import http from '../utils/http';

const loginRequest = (email, password) => {
  return http.post(sessionURL, {
    email: email,
    password: password,
  });
};

const logoutRequest = () => {
  return http.delete(sessionURL);
};

export { loginRequest, logoutRequest };
