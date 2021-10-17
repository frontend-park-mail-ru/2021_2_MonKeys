import { serverAddress, sessionURL } from '../constants/urls';
import { http } from '../utils/http';

const loginRequest = ({ email, password }) => {
  return http.post(`${serverAddress}${sessionURL}`, {
    email: email,
    password: password,
  });
};

const logoutRequest = () => {
  return http.delete(`${serverAddress}${sessionURL}`);
};

export { loginRequest, logoutRequest };
