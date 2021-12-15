import WebSocketManager from '../utils/webSocket.js';
import { notificationsURL } from '../constants/urls.js';
import eventBus from '../dispatcher/eventBus.js';
import { errorManager } from '../store/errorStore.js';
import { browserErr } from '../utils/constants/errorWS.js';
import { EVENTS } from '../dispatcher/events.js';
import { ProfileData } from '../store/profileStore.js';

const ws = new WebSocketManager(notificationsURL);

const Notifications = () => {
    return ws.CreateConnect().catch((err) => {
        if (err === browserErr) {
            errorManager.pushAPIError();
            throw err;
        }
    });
};

const initNotifications = () => {
    if (!('Notification' in window)) {
        return;
    }

    if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => console.log(permission));
    }

    ws.onmessage = function (response) {
        const notification = JSON.parse(response.data);

        eventBus.dispatch<ProfileData>(EVENTS.CHATS_NEW_MATCH, notification);
    };
};

export { Notifications, initNotifications };
