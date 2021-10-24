import { feedURL } from '../constants/urls.js';
import http, { parseJSON } from '../utils/http.js';

const feedRequest = () => {
  return http.get(feedURL)
      .then(parseJSON);
};

export { feedRequest };
