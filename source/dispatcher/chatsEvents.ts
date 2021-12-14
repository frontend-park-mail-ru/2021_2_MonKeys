import EventBus from './eventBus.js';
import router from '../route/router.js';
import { chatsManager } from '../store/chatsStore.js';
import { getChatRequest } from '../requests/chatRequest.js';
import { HTTPSuccess } from '../utils/constants/HTTPStatus.js';
import { ProfileData } from '../store/profileStore.js';
import { EVENTS } from './events.js';

export const ChatsEventsRegister = () => {
    EventBus.register(EVENTS.CHATS_PREVIEW_CHAT, (chatID: number) => {
        chatsManager.switchChat(chatID);

        router.go(`/chat`);
        window.history.replaceState('', '', '/chats');

        const messageID = chatsManager.getFirstMessageID(chatID);
        getChatRequest(chatID, messageID).then((data) => {
            if (data.status !== HTTPSuccess) {
                throw 'bad request';
            }

            chatsManager.openChat(chatID);
            chatsManager.updateChatMessages(chatID, data.body.Messages);
        });
    });

    EventBus.register(EVENTS.CHATS_NEW_CHAT, (profile: ProfileData) => {
        if (profile == null) {
            return;
        }
        const chatID = profile.id;

        if (chatsManager.hasChat(chatID)) {
            chatsManager.switchChat(chatID);

            if (chatsManager.hasMessages(chatID)) {
                const messageID = chatsManager.getFirstMessageID(chatID);
                getChatRequest(chatID, messageID).then((data) => {
                    if (data.status !== HTTPSuccess) {
                        throw 'bad request';
                    }

                    chatsManager.openChat(chatID);
                    chatsManager.updateChatMessages(chatID, data.body);
                });
            }
        } else {
            chatsManager.newChat(profile);
        }

        router.go('/chat');
        window.history.replaceState('', '', '/chats');
    });

    EventBus.register(EVENTS.CHATS_NEW_MATCH, (profile: ProfileData) => {
        console.log(profile);
    });
};
