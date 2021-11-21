import BaseStore from './storeBase.js';
import { wsURL } from '../constants/urls.js';

interface wsData {
    connect: WebSocket;
}

const ws = new BaseStore<wsData>();

ws.set({
    connect: new WebSocket(wsURL),
});

export default ws;
