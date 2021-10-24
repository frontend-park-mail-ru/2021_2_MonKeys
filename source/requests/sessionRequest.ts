import { sessionURL } from '../constants/urls.js';
import http, { parseJSON } from '../utils/http.js';

const loginRequest = (email: string, password: string) => {
  const body = JSON.stringify({
    email: email,
    password: password,
  });

  return http.post(sessionURL, body)
      .then(parseJSON);
};

const logoutRequest = () => {
  return http.delete(sessionURL)
      .then(parseJSON);
};

export { loginRequest, logoutRequest };
