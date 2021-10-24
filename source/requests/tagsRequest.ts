import { tagsURL } from '../constants/urls.js';
import http, { parseJSON } from '../utils/http.js';

const tagsRequest = () => {
  return http.get(tagsURL)
      .then(parseJSON);
};

export { tagsRequest };
