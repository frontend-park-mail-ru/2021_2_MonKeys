import ws from '../store/wsStore.js';
import { NewMessageWS } from '../requests/messageWS.js';
import eventBus from './eventBus.js';
import { Message } from '../store/chatsStore.js';

export const wsRegister = () => {
    ws.onmessage = NewMessageWS(function (message) {
        eventBus.dispatch<Message>('chat:new-message', message);
    });
};
