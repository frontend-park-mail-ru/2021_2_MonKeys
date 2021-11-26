import { wsCONNECTING, wsOPEN } from '../constants/wsStatus.js';

export default class WebSocketManager {
    private connect: WebSocket;
    private url: string;

    constructor(wsURL: string) {
        this.url = wsURL;
    }

    async CreateConnect() {
        if (!window['WebSocket']) {
            throw 'Your browser does not support WebSockets';
        }

        if (this.checkConnectWS()) {
            throw 'Connection is already established';
        }

        this.connect = new WebSocket(this.url);
    }

    async Send(data: string) {
        if (!this.checkConnectWS()) {
            throw 'connection not established';
        }

        this.connect.send(data);
    }

    set onmessage(onmessage) {
        if (!this.checkConnectWS()) {
            throw 'connection not established';
        }

        this.connect.onmessage = onmessage;
    }

    private checkConnectWS() {
        if (!this.connect) {
            return false;
        }

        const state = this.connect.readyState;
        return state === wsOPEN || state === wsCONNECTING;
    }
}
