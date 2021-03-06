import EventBus from './eventBus.js';
import { SendMessageWS } from '../requests/messageWS.js';
import { Message, chatsManager } from '../store/chatsStore.js';
import router from '../route/router.js';
import { MatchesStore } from '../store/matchStore.js';
import { searchMathesRequest } from '../requests/matchRequest.js';
import { HTTPSuccess } from '../utils/constants/HTTPStatus.js';
import { ProfileData } from '../store/profileStore.js';
import { EVENTS } from './events.js';
import { throttle } from '../utils/throttle.js';
import { getChatRequest } from '../requests/chatRequest.js';

export const ChatEventsRegister = () => {
    EventBus.register(EVENTS.CHAT_INPUT_MESSAGE, (chatID: number) => {
        const _msgInput = document.querySelectorAll<HTMLInputElement>('.message-input__field')[0];
        const messageText = _msgInput.value.trim();

        chatsManager.saveDraftMessage(chatID, messageText);
    });
    EventBus.register(EVENTS.CHAT_SEND_BUTTON, (chatID: number) => {
        const _msgInput = document.querySelectorAll<HTMLInputElement>('.message-input__field')[0];
        const messageText = _msgInput.value.trim();

        if (messageText !== '') {
            SendMessageWS(messageText, chatsManager.chatID)
                .then(() => {
                    chatsManager.clearDraftMessage(chatID);
                })
                .catch((err) => console.log(err));
        }
    });
    EventBus.register(EVENTS.CHAT_NEW_MESSAGE, (message: Message) => {
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

        const _chatSpace = document.getElementsByClassName('chat__messages')[0];
        if (_chatSpace) {
            _chatSpace.scrollTop = _chatSpace.scrollHeight;
        }
    });

    EventBus.register(EVENTS.CHAT_GET_MESSAGES, (chatID: number) => {
        const messageID = chatsManager.getFirstMessageID(chatID);
        getChatRequest(chatID, messageID).then((data) => {
            if (data.status !== HTTPSuccess) {
                throw 'bad request';
            }

            chatsManager.updateChatMessages(chatID, data.body.Messages);
        });
    });

    EventBus.register(EVENTS.CHAT_BACK_BUTTON, (chatID: number) => {
        chatsManager.closeChat(chatID);
        router.go('/chats');
    });

    const chatSearchThreshhold = 1000;
    EventBus.register(
        EVENTS.CHAT_SEARCH,
        throttle(() => {
            const _searchInput = document.getElementsByTagName('input')[0];
            const searchTmpl = _searchInput.value.trim() + '%';

            searchMathesRequest(searchTmpl).then((data) => {
                if (data.status !== HTTPSuccess) {
                    throw 'bad response';
                }

                if (data.body.allUsers) {
                    const matchesData = MatchesStore.get();
                    matchesData.matches = data.body.allUsers;
                    matchesData.matchesTotal = data.body.matchesCount;
                    MatchesStore.set(matchesData);
                }
            });
        }, chatSearchThreshhold)
    );
    EventBus.register(EVENTS.CHAT_OPEN_PROFILE, (userID: number) => {
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
        chatsManager.activateProfile(userID);
    });
    EventBus.register(EVENTS.CHAT_BACK_TO_CHAT_BUTTON, (userID: number) => {
        chatsManager.disableProfile(userID);
    });
};
