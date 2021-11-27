import WebSocketManager from '../utils/webSocket.js';
import { wsURL } from '../constants/urls.js';
import eventBus from '../dispatcher/eventBus.js';
import { Message } from '../store/chatsStore.js';

const ws = new WebSocketManager(wsURL);

const ConnectWS = () => {
    return ws.CreateConnect();
};

const initWS = () => {
    ws.onmessage = function (response) {
        const message = JSON.parse(response.data);
        message.date = new Date(message.date);

        eventBus.dispatch<Message>('chat:new-message', message);
    };
};

const SendMessageWS = (message: string, recipient: number) => {
    const data = JSON.stringify({
        toID: recipient,
        text: message,
    });

    return ws.Send(data);
};

export { ConnectWS, initWS, SendMessageWS };
