import EventBus from './eventBus.js';
import { SendMessageWS } from '../requests/messageWS.js';
import { Message, chatsManager } from '../store/chatsStore.js';
import router from '../route/router.js';
import { MatchesStore } from '../store/matchStore.js';
import { searchMathesRequest } from '../requests/matchRequest.js';
import { HTTPSuccess } from '../constants/HTTPStatus.js';
import { ProfileData } from '../store/profileStore.js';

export const ChatEventsRegister = () => {
    EventBus.register('chat:send-button', (payload?: string) => {
        const _msgInput = document.getElementsByTagName('input')[0];
        const messageText = _msgInput.value.trim();

        SendMessageWS(messageText, chatsManager.chatID).catch((err) => console.log(err));
    });

    EventBus.register('chat:new-message', (message: Message) => {
        const chatID = chatsManager.getChatIDByMessage(message);
        if (!chatsManager.isHaveChat(chatID)) {
            let profile: ProfileData;

            const matches = MatchesStore.get().matches;
            for (let i = 0; i < MatchesStore.get().matchesTotal; i++) {
                if (matches[i].id === message.fromID) {
                    profile = matches[i];
                    break;
                }
            }

            chatsManager.newChat(profile)
        }

        chatsManager.saveNewMessage(message);
    });

    EventBus.register('chat:back-button', (payload?: string) => {
        router.go('/chats');
    });

    EventBus.register('chat:search', () => {
        // const storeData = MatchesStore.get();
        // storeData.searching = true;
        // MatchesStore.set(storeData);

        // console.log(storeData.matches);
        const _searchInput = document.getElementsByTagName('input')[0];
        const searchTmpl = _searchInput.value.trim() + '%';

        searchMathesRequest(searchTmpl).then((matchesResponse) => {
            if (matchesResponse.status === HTTPSuccess) {
                if (matchesResponse.data.status === HTTPSuccess) {
                    if (matchesResponse.data.body.allUsers) {
                        const matchesData = MatchesStore.get();
                        matchesData.matches = matchesResponse.data.body.allUsers;
                        matchesData.matchesTotal = matchesResponse.data.body.matchesCount;
                        MatchesStore.set(matchesData);
                    }
                } else {
                    throw '400';
                }
            } else {
                // const feedData = feedStore.get();
                // feedData.apiErrorLoadCondition = true;
                // feedStore.set(feedData);
            }
        });

        // const storeData = MatchesStore.get();
        // storeData.expended = false;
        // <tStore.set(storeData);
    });
};
