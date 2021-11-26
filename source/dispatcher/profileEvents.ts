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
        const storeData = ProfileStore.get();
        storeData.apiErrorLoadCondition = false;
        ProfileStore.set(storeData);
        router.go('/edit');
    });

    EventBus.register('profile:logout-button', () => {
        const storeData = ProfileStore.get();
        storeData.apiErrorLoadCondition = false;
        ProfileStore.set(storeData);
        AuthStore.set({
            loggedIn: userStatus.notLoggedIn,
        });
        logoutRequest()
            .then((response) => {
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
                            apiErrorLoadCondition: false,
                        });
                        router.go('/login');
                    } else if (response.data.status === HTTPNotFound) {
                        throw 'HTTPNotFound';
                    } else {
                        throw '400';
                    }
                } else {
                    const storeData = ProfileStore.get();
                    storeData.apiErrorLoadCondition = true;
                    ProfileStore.set(storeData);
                }
            })
            .catch(() => {
                const storeData = ProfileStore.get();
                storeData.apiErrorLoadCondition = true;
                ProfileStore.set(storeData);
            });
    });
};
