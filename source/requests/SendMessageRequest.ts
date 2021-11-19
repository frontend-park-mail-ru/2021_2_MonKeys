import ws from '../store/wsStore.js';
import { wsURL } from '../constants/urls.js';
import { wsOPEN } from '../constants/wsStatus.js';
import { wsRegister } from '../dispatcher/wsEvents.js';

export const SendMessage = (message) => {
    wsCheck();

    if (ws.get().connect.readyState !== wsOPEN) {
        return;
    }

    ws.get().connect.send(
        JSON.stringify({
            text: message,
        })
    );
};

function wsCheck() {
    console.log('----- wsCheck -----');
    let connect = ws.get().connect;
    console.log(ws);

    if (connect.readyState !== 1) {
        connect = new WebSocket(wsURL);
    }
    ws.set({
        connect: connect,
    });
    wsRegister();

    console.log(ws);
}
