import { chatsURL } from '../constants/urls.js';
import http from '../utils/http.js';

const getChats = () => {
  return http.get(chatsURL);
};

export { getChats };
