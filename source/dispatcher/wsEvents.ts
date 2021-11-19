import ws from '../store/wsStore.js';
import { NewMessage } from './chatEvents.js';

export const wsRegister = () => {
    ws.get().connect.onmessage = function (event) {
        NewMessage(JSON.parse(event.data));
    };
};
