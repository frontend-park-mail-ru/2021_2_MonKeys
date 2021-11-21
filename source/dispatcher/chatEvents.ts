import EventBus from './eventBus.js';
import { SendMessageWS } from '../requests/messageWS.js';
import { ChatsStore, getChatIdxByMessage, getIdxByChatID, Message } from '../store/ChatsStore.js';
import router from '../route/router.js';

export const ChatEventsRegister = () => {
    EventBus.register('chat:send-button', (payload?: string) => {
        const _msgInput = document.getElementsByTagName('textarea')[0];
        const messageText = _msgInput.value.trim();

        SendMessageWS(messageText, ChatsStore.get().currentChat).catch((err) => console.log(err));
    });

    EventBus.register('chat:back-button', (payload?: string) => {
        router.go('/chats');
    });
};

export const NewMessage = (message: Message) => {
    const storeData = ChatsStore.get();
    const chatIdx = getChatIdxByMessage(message);

    storeData.chats[chatIdx].messages.push(message);

    ChatsStore.set(storeData);
};
