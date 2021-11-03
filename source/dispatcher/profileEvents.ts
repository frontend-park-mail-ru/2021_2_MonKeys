import router from '../route/router.js';
import EventBus from './eventBus.js';
import { logoutRequest } from '../requests/sessionRequest.js';
import { HTTPNotFound, HTTPSuccess } from '../constants/HTTPStatus.js';
import AuthStore from '../store/authStore.js';
import { userStatus } from '../constants/userStatus.js';
import { ProfileStore } from '../store/profileStore.js';
import feedStore from '../store/feedStore.js';

export const ProfileEventsRegister = () => {
    EventBus.register('profile:edit-button', () => {
        router.go('/edit');
    });

    EventBus.register('profile:logout-button', () => {
        AuthStore.set({
            loggedIn: userStatus.notlLoggedIn,
        });
        logoutRequest().then((response) => {
            if (response.status === HTTPSuccess) {
                if (response.data.status === HTTPSuccess) {
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
                } else if (response.data.status === HTTPNotFound) {
                    /// ????
                    console.log('xz');
                } else {
                    console.log('error');
                }
            } else {
                // server internal error
                console.log('server internal error');
            }
        });
    });
};
