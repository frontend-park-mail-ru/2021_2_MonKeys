import router from '../route/router.js';

import { HTTPEMailNotFound, HTTPNotFound, HTTPSuccess } from '../constants/HTTPStatus.js';
import { ProfileStore } from '../store/profileStore.js';
import { feedRequest } from '../requests/feedRequest.js';
import { getProfile } from '../requests/profileRequest.js';

import { LoginEventRegister } from './loginEvents.js';
import { SignupEventRegister } from './signupEvents.js';
import { EditEventRegister } from './editEvents.js';
import { ProfileEventsRegister } from './profileEvents.js';
import { LikesEventsRegister } from './likesEvents.js';
import { FeedEventsRegister } from './feedEvents.js';
import { ChatEventsRegister } from './chatEvents.js';
import { CarouselEventsRegister } from './carouselEvents.js';
import eventBus from './eventBus.js';
import AuthStore from '../store/authStore.js';
import { userStatus } from '../constants/userStatus.js';
import feedStore from '../store/feedStore.js';
import { matchRequest } from '../requests/matchRequest.js';
import LikesStore from '../store/likesStore.js';
import { ErrorEventsRegister } from './errorEvents.js';
const $root = document.getElementById('app');

export const InitBus = () => {
    eventBus.register('user:cookie-requests', (payload?: string) => {
        getProfile().then((response) => {
            if (response.status === HTTPSuccess) {
                if (response.data.status === HTTPSuccess) {
                    if (response.data.body.name) {
                        AuthStore.set({
                            loggedIn: userStatus.loggedIn,
                        });
                        matchRequest().then((matchResponse) => {
                            const likesData = LikesStore.get();
                            likesData.profiles = matchResponse.data.body.allUsers;
                            likesData.mathesCount = matchResponse.data.body.matchesCount;
                            LikesStore.set(likesData);
                        });

                        ProfileStore.set(response.data.body);

                        feedRequest().then((feedResponse) => {
                            const profileData = feedStore.get();
                            if (feedResponse.data.body !== null) {
                                profileData.profiles = feedResponse.data.body;
                            } else {
                                profileData.outOfCards = true;
                            }

                            feedStore.set(profileData);
                            if (window.location.pathname === '/signup-edit') {
                                router.go('/feed');
                            } else {
                                router.go(window.location.pathname);
                            }
                        });
                    } else {
                        AuthStore.set({
                            loggedIn: userStatus.Signup,
                        });
                        router.go('/signup-edit');
                    }
                } else {
                    router.go('/login');
                }
            } else {
                throw 'server internal error';
            }
        });
    });
    LoginEventRegister();
    SignupEventRegister();

    EditEventRegister();

    ProfileEventsRegister();
    LikesEventsRegister();
    FeedEventsRegister();
    ChatEventsRegister();

    CarouselEventsRegister();

    ErrorEventsRegister();
};
