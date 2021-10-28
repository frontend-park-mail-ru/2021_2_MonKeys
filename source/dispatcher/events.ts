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
const $root = document.getElementById('app');

export const InitBus = () => {
    eventBus.register('user:cookie-requests', (payload?: string) => {
        // 1) получить профиль
        // 2) получить мэтчи
        // 3) получить ленту
        // ... получить чаты
        getProfile().then((response) => {
            if (response.status === HTTPSuccess) {
                if (response.data.status === HTTPSuccess) {
                    if (response.data.body.name) {
                        AuthStore.set({
                            loggedIn: userStatus.loggedIn,
                        });
                        matchRequest().then((matchResponse) => {
                            console.log('matches');
                            console.log(matchResponse);
                        });
                        ProfileStore.set(response.data.body);
                        feedRequest().then((feedResponse) => {
                            console.log(feedResponse);
                            const profileData = feedStore.get();
                            profileData.profiles = feedResponse.data.body;
                            feedStore.set(profileData);
                            router.go('/feed');
                        });
                    } else {
                        AuthStore.set({
                            loggedIn: userStatus.Signup,
                        });
                    }
                    //   router.go("/feed");
                } else {
                    console.log('error');
                }
            } else {
                // server internal error
                console.log('server internal error');
            }
        });
    });
    // -------------------------login-----------------------------
    LoginEventRegister();
    // -------------------------signup----------------------------
    SignupEventRegister();

    // --------------------------edit-----------------------------
    EditEventRegister();

    // ----------------------------profile-----------------------
    ProfileEventsRegister();
    // ----------------------likes--------------------------------
    LikesEventsRegister();
    // -------------------feed------------------------------------
    FeedEventsRegister();
    // -------------------chat------------------------------------
    ChatEventsRegister();

    CarouselEventsRegister();
};
