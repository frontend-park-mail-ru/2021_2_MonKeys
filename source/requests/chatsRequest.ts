import { chatsURL } from '../constants/urls.js';
import http from '../utils/http.js';
import { HTTPSuccess } from '../utils/constants/HTTPStatus.js';
import { Chat, Message } from '../store/chatsStore.js';
import { errorManager } from '../store/errorStore.js';

const getChatsRequest = () => {
    return http
        .get(chatsURL)
        .then((response) => {
            if (response.status !== HTTPSuccess) {
                throw 'server internal error';
            }

            if (response.data.body && response.data.body.length !== 0) {
                response.data.body.Chats.forEach((chat: Chat) => {
                    chat.messages.forEach((message: Message) => {
                        message.date = new Date(message.date);
                    });
                });
            }

            return response.data;
        })
        .catch((err) => {
            errorManager.pushAPIError();
            throw err;
        });
};

export { getChatsRequest };
