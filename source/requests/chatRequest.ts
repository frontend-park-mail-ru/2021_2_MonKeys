import { chatURL } from '../constants/urls.js';
import http from '../utils/http.js';
import { HTTPSuccess } from '../constants/HTTPStatus.js';
import { Message } from '../store/chatsStore.js';
import { errorManager } from '../store/errorStore.js';

const getChatRequest = (fromUserID, lastMessageID) => {
    return http
        .get(`${chatURL}/${fromUserID}&${lastMessageID}`)
        .then((response) => {
            if (response.status !== HTTPSuccess) {
                throw 'server internal error';
            }

            if (response.data.body && response.data.body.length !== 0) {
                response.data.body.forEach((message: Message) => {
                    message.date = new Date(message.date);
                });
            }

            return response.data;
        })
        .catch((err) => {
            errorManager.pushAPIError();
            throw err;
        });
};

export { getChatRequest };
