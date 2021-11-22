import EventBus from './eventBus.js';
import { SendMessageWS } from '../requests/messageWS.js';
import { ChatsStore, getChatIdxByMessage, getIdxByChatID, Message } from '../store/ChatsStore.js';
import router from '../route/router.js';
import { MatchesStore } from '../store/matchStore.js';
import { searchMathesRequest } from '../requests/matchRequest.js';
import { HTTPSuccess } from '../constants/HTTPStatus.js';

export const ChatEventsRegister = () => {
    EventBus.register('chat:send-button', (payload?: string) => {
        const _msgInput = document.getElementsByTagName('input')[0];
        const messageText = _msgInput.value.trim();

        SendMessageWS(messageText, ChatsStore.get().currentChat).catch((err) => console.log(err));
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

export const NewMessage = (message: Message) => {
    const storeData = ChatsStore.get();
    const chatIdx = getChatIdxByMessage(message);

    storeData.chats[chatIdx].messages.push(message);

    ChatsStore.set(storeData);
};
