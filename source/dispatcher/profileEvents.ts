import router from '../route/router.js';
import EventBus from './eventBus.js';
import { logoutRequest } from '../requests/sessionRequest.js';
import { HTTPSuccess } from '../utils/constants/HTTPStatus.js';
import AuthStore from '../store/authStore.js';
import { userStatus } from '../constants/userStatus.js';
import { ProfileStore } from '../store/profileStore.js';
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
            ProfileStore.set({
                id: undefined,
                name: undefined,
                age: undefined,
                date: undefined,
                description: undefined,
                imgs: undefined,
                tags: undefined,
            });
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
