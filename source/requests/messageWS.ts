import ws from '../store/wsStore.js';

const SendMessageWS = (message) => {
    const data = JSON.stringify({
        text: message,
    });

    return ws.Send(data);
};

const NewMessageWS = (messageHandler) => {
    return function (message) {
        messageHandler(JSON.parse(message.data));
    }
}

export { SendMessageWS, NewMessageWS }
