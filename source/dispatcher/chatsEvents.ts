import EventBus from './eventBus.js';
import router from '../route/router.js';
import { ChatsStore, getFirstMessageID, updateChatMessages } from '../store/ChatsStore.js';
import { getChat } from '../requests/ChatRequest.js';
import { HTTPSuccess } from '../constants/HTTPStatus.js';

export const ChatsEventsRegister = () => {
    EventBus.register('chats:preview-chat', (chatID: number) => {
        const chatsStore = ChatsStore.get();
        chatsStore.currentChat = chatID;
        ChatsStore.set(chatsStore);

        router.go('/chat');

        const messageID = getFirstMessageID(chatID);
        getChat(chatID, messageID)
            .then((response) => {
                if (response.status !== HTTPSuccess || response.data.status !== HTTPSuccess) {
                    throw 'bad request';
                }

                updateChatMessages(chatID, response.data.body);
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    });
};
