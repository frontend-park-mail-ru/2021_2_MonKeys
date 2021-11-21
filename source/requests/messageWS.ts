import ws from '../store/wsStore.js';

const SendMessageWS = (message: string, recipient: number) => {
    const data = JSON.stringify({
        toID: recipient,
        text: message,
    });

    return ws.Send(data);
};

const NewMessageWS = (messageHandler) => {
    return function (message) {
        messageHandler(JSON.parse(message.data));
    };
};

export { SendMessageWS, NewMessageWS };
