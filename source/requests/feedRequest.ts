import { feedURL } from '../constants/urls.js';
import http from '../utils/http.js';

const feedRequest = () => {
  return http.get(feedURL);
};

export { feedRequest };
