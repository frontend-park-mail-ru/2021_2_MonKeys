import { tagsURL } from '../constants/urls.js';
import http from '../utils/http.js';

const tagsRequest = () => {
    return http.get(tagsURL);
};

export { tagsRequest };
