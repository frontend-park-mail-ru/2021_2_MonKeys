import EventBus from './eventBus.js';
import { ChatStore } from '../store/chatStore.js';
import { SendMessage } from '../requests/SendMessageRequest.js';

export const ChatEventsRegister = () => {
    EventBus.register('chat:send-button', (payload?: string) => {
        const _msgInput = document.getElementsByTagName('textarea')[0];
        const messageText = _msgInput.value.trim();

        SendMessage(messageText);

        // const storeData = ChatStore.get();

        // storeData.messages.push({
        //   text: messageText,
        //   fromID: "1",
        // });
        // storeData.apiErrorLoadCondition = false;
        //
        // ChatStore.set(storeData);
    });
};

export const NewMessage = (message) => {
    const storeData = ChatStore.get();

    storeData.messages.push(message);

    ChatStore.set(storeData);
};
