import { chatURL } from '../constants/urls.js';
import http from '../utils/http.js';

const getChat = (fromUserID) => {
  return http.get(`${chatURL}/${fromUserID}`);
};

export { getChat };
