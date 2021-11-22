import BaseStore from './storeBase.js';
import { wsCONNECTING, wsOPEN } from '../constants/wsStatus.js';

interface wsData {
    connect: WebSocket;
}

class WebSocketStore {
    ws = new BaseStore<wsData>();

    async CreateConnect(wsURL) {
        if (!window['WebSocket']) {
            throw 'Your browser does not support WebSockets';
        }

        this.ws.set({
            connect: new WebSocket(wsURL),
        });
    }

    checkConnectWS() {
        const state = this.ws.get().connect.readyState;
        return state === wsOPEN || state === wsCONNECTING;
    }

    async Send(data: string) {
        if (!this.checkConnectWS()) {
            throw 'connection not established';
        }

        this.ws.get().connect.send(data);
    }

    set onmessage(onmessage) {
        if (!this.checkConnectWS()) {
            throw 'connection not established';
        }

        this.ws.get().connect.onmessage = onmessage;
    }
}

const ws = new WebSocketStore();

export default ws;
