import EventBus from './eventBus.js';
import router from '../route/router.js';
import { chatsManager } from '../store/chatsStore.js';
import { getChat } from '../requests/chatRequest.js';
import { HTTPSuccess } from '../constants/HTTPStatus.js';
import { ProfileData } from '../store/profileStore.js';
import { errorManager } from '../store/errorStore.js';

export const ChatsEventsRegister = () => {
    EventBus.register('chats:preview-chat', (chatID: number) => {
        chatsManager.switchChat(chatID);

        router.go(`/chat`);

        const messageID = chatsManager.getFirstMessageID(chatID);
        getChat(chatID, messageID)
            .then((response) => {
                if (response.status !== HTTPSuccess || response.data.status !== HTTPSuccess) {
                    throw 'bad request';
                }

                chatsManager.openChat(chatID);
                chatsManager.updateChatMessages(chatID, response.data.body);

                // if (!chatsManager.withProfile(chatID)) {
                //     const matchesData = MatchesStore.get();
                //     let profile: ProfileData;
                //     for (let i = 0; i < matchesData.matchesTotal; i++) {
                //         if (matchesData.matches[i].id === chatID) {
                //             profile = matchesData.matches[i];
                //         }
                //     }
                //     chatsManager.setProfile(chatID, profile);
                // }
            })
            .catch((err) => {
                errorManager.pushAPIError();
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

            if (chatsManager.hasMessages(chatID)) {
                const messageID = chatsManager.getFirstMessageID(chatID);
                getChat(chatID, messageID)
                    .then((response) => {
                        if (response.status !== HTTPSuccess || response.data.status !== HTTPSuccess) {
                            throw 'bad request';
                        }

                        chatsManager.updateChatMessages(chatID, response.data.body);
                    })
                    .catch((err) => {
                        errorManager.pushAPIError();
                        throw err;
                    });
            }
        } else {
            chatsManager.newChat(profile);
        }

        router.go('/chat');
    });
};
