import ws from '../store/wsStore.js';
import { wsURL } from '../constants/urls.js';
import { wsOPEN } from '../constants/wsStatus.js';
import { wsRegister } from '../dispatcher/wsEvents.js';

const SendMessageWS = (message) => {
    if (!checkConnectWS()) {
        return;
    }

    ws.get().connect.send(
        JSON.stringify({
            text: message,
        })
    );
};

const NewMessageWS = (messageHandler) => {
    return function (message) {
        messageHandler(JSON.parse(message.data));
    }
}

function checkConnectWS() {
    if (ws.get().connect.readyState === 1) {
        return true;
    }

    const connect = new WebSocket(wsURL);
    if (connect.readyState !== 1) {
        return false;
    }

    ws.set({
        connect: connect,
    });
    wsRegister();

    return true;
}

export { SendMessageWS, NewMessageWS }
