import router from '../route/router.js';
import EventBus from './eventBus.js';
import { logoutRequest } from '../requests/sessionRequest.js';
import { HTTPSuccess } from '../utils/constants/HTTPStatus.js';
import AuthStore from '../store/authStore.js';
import { userStatus } from '../constants/userStatus.js';
import feedStore from '../store/feedStore.js';
import { EVENTS } from './events.js';

export const ProfileEventsRegister = () => {
    EventBus.register(EVENTS.PROFILE_EDIT_BUTTON, () => {
        router.go('/edit');
    });

    EventBus.register(EVENTS.PROFILE_LOGOUT_BUTTON, () => {
        AuthStore.set({
            loggedIn: userStatus.notLoggedIn,
        });
        logoutRequest().then((data) => {
            if (data.status !== HTTPSuccess) {
                throw 'bad response';
            }
            feedStore.set({
                profiles: undefined,
                counter: 0,
                outOfCards: false,
                expanded: false,
            });
            router.go('/login');
        });
    });
};
