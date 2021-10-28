import { sessionURL } from "../constants/urls.js";
import http from "../utils/http.js";

const loginRequest = (email: string, password: string) => {
  const body = JSON.stringify({
    email: email,
    password: password,
  });

  return http.post(sessionURL, body);
};

const logoutRequest = () => {
  return http.delete(sessionURL);
};

export { loginRequest, logoutRequest };
