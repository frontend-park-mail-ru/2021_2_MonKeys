import { feedURL } from '../constants/urls';
import http from '../utils/http';

const feedRequest = () => {
  return http.get(feedURL);
};

export { feedRequest };
