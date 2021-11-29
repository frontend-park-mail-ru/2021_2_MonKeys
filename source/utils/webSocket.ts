import { wsCONNECTING, wsOPEN } from './constants/statusWS.js';
import { browserErr, connIsAlreadyEstablishedErr, connNotEstablishedErr } from './constants/errorWS.js';

export default class WebSocketManager {
    private connect: WebSocket;
    private url: string;

    constructor(wsURL: string) {
        this.url = wsURL;
    }

    async CreateConnect() {
        if (!window['WebSocket']) {
            throw browserErr;
        }

        if (this.checkConnectWS()) {
            throw connIsAlreadyEstablishedErr;
        }

        this.connect = new WebSocket(this.url);
    }

    async Send(data: string) {
        if (!this.checkConnectWS()) {
            throw connNotEstablishedErr;
        }

        this.connect.send(data);
    }

    set onmessage(onmessage) {
        if (!this.checkConnectWS()) {
            throw connNotEstablishedErr;
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
