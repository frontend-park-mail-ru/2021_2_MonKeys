import { chatURL } from '../constants/urls.js';
import http from '../utils/http.js';
import { HTTPSuccess } from '../utils/constants/HTTPStatus.js';
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
                if (response.data.body.Messages) {
                    response.data.body.Messages.forEach((message: Message) => {
                        message.date = new Date(message.date);
                    });
                }
            }

            return response.data;
        })
        .catch((err) => {
            errorManager.pushAPIError();
            throw err;
        });
};

const deleteChatRequest = (fromUserID) => {
    return http
        .delete(`${chatURL}/${fromUserID}`)
        .then((response) => {
            if (response.status !== HTTPSuccess) {
                throw 'server internal error';
            }

            return response.data;
        })
        .catch((err) => {
            errorManager.pushAPIError();
            throw err;
        });
};

export { getChatRequest, deleteChatRequest };
