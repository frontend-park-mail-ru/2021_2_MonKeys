import EventBus from './eventBus.js';
import router from '../route/router.js';
import { chatsManager } from '../store/ChatsStore.js';
import { getChat } from '../requests/ChatRequest.js';
import { HTTPSuccess } from '../constants/HTTPStatus.js';
import { ProfileData } from '../store/profileStore.js';

export const ChatsEventsRegister = () => {
    EventBus.register('chats:preview-chat', (chatID: number) => {
        chatsManager.switchChat(chatID);

        router.go('/chat');

        const messageID = chatsManager.getFirstMessageID(chatID);
        getChat(chatID, messageID)
            .then((response) => {
                if (response.status !== HTTPSuccess || response.data.status !== HTTPSuccess) {
                    throw 'bad request';
                }

                chatsManager.updateChatMessages(chatID, response.data.body);
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    });

    EventBus.register('chats:new-chat', (profile: ProfileData) => {
        chatsManager.newChat(profile);

        router.go('/chat');
    });
};
