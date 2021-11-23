import { chatURL } from '../constants/urls.js';
import http from '../utils/http.js';

const getChat = (fromUserID, lastMessageID) => {
    return http.get(`${chatURL}/${fromUserID}&${lastMessageID}`);
};

export { getChat };
