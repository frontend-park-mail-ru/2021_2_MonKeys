import { matchURL } from '../constants/urls';
import http, { parseJSON } from '../utils/http';

const matchRequest = () => {
  return http.get(matchURL)
      .then(parseJSON);
};

export { matchRequest };
