import { serverAddress, sessionURL } from '../constants/urls';
import { http } from '../utils/http';

const loginRequest = (login, password) => {
  return http.post(`${serverAddress}${sessionURL}`, {
    login: login,
    password: password,
  });
};

const logoutRequest = () => {
  return http.delete(`${serverAddress}${sessionURL}`);
};

export { loginRequest, logoutRequest };
