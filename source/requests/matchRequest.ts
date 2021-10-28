import { matchURL } from "../constants/urls.js";
import http from "../utils/http.js";

const matchRequest = () => {
  return http.get(matchURL);
};

export { matchRequest };
