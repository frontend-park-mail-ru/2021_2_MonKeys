import EventBus from './eventBus.js';
import { SendMessageWS } from '../requests/messageWS.js';
import { ChatsStore, Message } from '../store/ChatsStore.js';

export const ChatEventsRegister = () => {
    EventBus.register('chat:send-button', (payload?: string) => {
        const _msgInput = document.getElementsByTagName('textarea')[0];
        const messageText = _msgInput.value.trim();

        SendMessageWS(messageText).catch((err) => console.log(err));
    });
};

// export const NewMessage = (message: Message) => {
export const NewMessage = (message) => {
    const storeData = ChatsStore.get();

    const msg: Message = {
        text: message.text,
        date: new Date(),
        fromID: '10',
        isRead: true,
        messageID: 'qsdqwewx',
    }

    storeData.chats[0].messages.push(msg);

    ChatsStore.set(storeData);
};
