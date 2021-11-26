import EventBus from './eventBus.js';
import router from '../route/router.js';
import { chatsManager } from '../store/chatsStore.js';
import { getChat } from '../requests/chatRequest.js';
import { HTTPSuccess } from '../constants/HTTPStatus.js';
import { ProfileData } from '../store/profileStore.js';

export const ChatsEventsRegister = () => {
    EventBus.register('chats:preview-chat', (chatID: number) => {
        chatsManager.switchChat(chatID);

        router.go(`/chat/${chatID}`);

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
        if (profile == null) {
            return;
        }
        const chatID = profile.id;

        if (chatsManager.hasChat(chatID)) {
            chatsManager.switchChat(chatID);

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
        } else {
            chatsManager.newChat(profile);
        }

        router.go('/chat');
    });
};
