import EventBus from './eventBus.js';
import { SendMessageWS } from '../requests/messageWS.js';
import { Message, chatsManager } from '../store/chatsStore.js';
import router from '../route/router.js';
import { MatchesStore } from '../store/matchStore.js';
import { searchMathesRequest } from '../requests/matchRequest.js';
import { HTTPSuccess } from '../utils/constants/HTTPStatus.js';
import { ProfileData } from '../store/profileStore.js';

export const ChatEventsRegister = () => {
    EventBus.register('chat:input-message', (chatID: number) => {
        const _msgInput = document.getElementsByTagName('input')[0];
        const messageText = _msgInput.value.trim();

        chatsManager.saveDraftMessage(chatID, messageText);
    });
    EventBus.register('chat:send-button', (chatID: number) => {
        const _msgInput = document.getElementsByTagName('input')[0];
        const messageText = _msgInput.value.trim();

        if (messageText !== '') {
            SendMessageWS(messageText, chatsManager.chatID)
                .then(() => {
                    chatsManager.clearDraftMessage(chatID);
                })
                .catch((err) => console.log(err));
        }
    });
    EventBus.register('chat:new-message', (message: Message) => {
        const chatID = chatsManager.getChatIDByMessage(message);
        if (!chatsManager.hasChat(chatID)) {
            let profile: ProfileData;

            const matches = MatchesStore.get().matches;
            for (let i = 0; i < MatchesStore.get().matchesTotal; i++) {
                if (matches[i].id === message.fromID) {
                    profile = matches[i];
                    break;
                }
            }

            chatsManager.newChat(profile);
        }

        chatsManager.saveNewMessage(message);

        const _chatSpace = document.getElementsByClassName('view-contant__message-space')[0];
        _chatSpace.scrollTop = _chatSpace.scrollHeight;
    });

    EventBus.register('chat:back-button', (chatID: number) => {
        chatsManager.closeChat(chatID);
        router.go('/chats');
    });

    EventBus.register('chat:search', () => {
        const _searchInput = document.getElementsByTagName('input')[0];
        const searchTmpl = _searchInput.value.trim() + '%';

        searchMathesRequest(searchTmpl).then((data) => {
            if (data.status === HTTPSuccess) {
                throw 'bad response';
            }

            if (data.body.allUsers) {
                const matchesData = MatchesStore.get();
                matchesData.matches = data.body.allUsers;
                matchesData.matchesTotal = data.body.matchesCount;
                MatchesStore.set(matchesData);
            }
        });

        // const storeData = MatchesStore.get();
        // storeData.expended = false;
        // <tStore.set(storeData);
    });
    EventBus.register('chat:open-profile', (userID: number) => {
        if (!chatsManager.withProfile(userID)) {
            const matchesData = MatchesStore.get();
            let profile: ProfileData;
            for (let i = 0; i < matchesData.matchesTotal; i++) {
                if (matchesData.matches[i].id === userID) {
                    profile = matchesData.matches[i];
                }
            }
            chatsManager.setProfile(userID, profile);
        }
    });
};
