import router from '../route/router.js';

import { HTTPSuccess } from '../constants/HTTPStatus.js';
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
import { MatchesStore } from '../store/matchStore.js';
import { ErrorEventsRegister } from './errorEvents.js';
import { ChatsEventsRegister } from './chatsEvents.js';
import { getChats } from '../requests/chatsRequest.js';
import { userLikesRequset } from '../requests/likesRequest.js';
import { chatsManager } from '../store/chatsStore.js';
import { ReportsEventsRegister } from './reportsEvents.js';
import { SwipeEvenetsRegister } from './swipeEvents.js';
import { ConnectWS, initWS } from '../requests/messageWS.js';

export const InitBus = () => {
    eventBus.register('user:cookie-requests', () => {
        getProfile()
            .then((response) => {
                if (response.status !== HTTPSuccess) {
                    throw 'server internal error';
                }

                if (response.data.status !== HTTPSuccess) {
                    router.go('/login');
                    return;
                }

                const profile = response.data.body;

                if (profile.name) {
                    AuthStore.set({
                        loggedIn: userStatus.loggedIn,
                    });
                    ProfileStore.set(profile);

                    eventBus.dispatch('user:data-requests');
                } else {
                    AuthStore.set({
                        loggedIn: userStatus.Signup,
                    });
                    router.go('/signup-edit');
                }
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    });
    eventBus.register('user:data-requests', () => {
        if (AuthStore.get().loggedIn !== userStatus.loggedIn) {
            return;
        }

        matchRequest().then((matchResponse) => {
            const matchesData = MatchesStore.get();
            matchesData.matches = matchResponse.data.body.allUsers;
            matchesData.matchesTotal = matchResponse.data.body.matchesCount;
            MatchesStore.set(matchesData);
        });
        userLikesRequset().then((likesResponse) => {
            const likesData = LikesStore.get();
            likesData.profiles = likesResponse.data.body.allUsers;
            likesData.likesCount = likesResponse.data.body.likesCount;
            likesData.expended = false;
            likesData.reported = false;
            likesData.userIndex = 0;
            LikesStore.set(likesData);
        });

        feedRequest().then((response) => {
            if (response.status !== HTTPSuccess || response.data.status !== HTTPSuccess) {
                throw 'bad request';
            }
            const feed = feedStore.get();
            if (response.data.body !== null) {
                feed.profiles = response.data.body;
            } else {
                feed.outOfCards = true;
            }

            feedStore.set(feed);
            if (window.location.pathname === '/signup-edit') {
                router.go('/feed');
            } else {
                router.go(window.location.pathname);
            }
        });

        getChats()
            .then((response) => {
                if (response.status !== HTTPSuccess || response.data.status !== HTTPSuccess) {
                    throw 'bad request';
                }

                chatsManager.chats = response.data.body;
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });

        ConnectWS()
            .then(initWS)
            .catch((err) => {
                console.log(err);
                throw err;
            });
    });
    LoginEventRegister();
    SignupEventRegister();

    EditEventRegister();

    ProfileEventsRegister();
    LikesEventsRegister();
    FeedEventsRegister();

    ChatsEventsRegister();
    ChatEventsRegister();

    CarouselEventsRegister();

    ErrorEventsRegister();

    ReportsEventsRegister();

    SwipeEvenetsRegister();
};
