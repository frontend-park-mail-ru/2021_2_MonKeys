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
import { MatchesStore } from '../store/matchStore.js';
import { ErrorEventsRegister } from './errorEvents.js';
import { wsRegister } from './wsEvents.js';
import { ChatsEventsRegister } from './chatsEvents.js';
import ws from '../store/wsStore.js';
import { wsURL } from '../constants/urls.js';
import { getChats } from '../requests/chatsRequest.js';
import { userLikesRequset } from '../requests/likesRequest.js';
import { chatsManager } from '../store/chatsStore.js';
import { ReportsEventsRegister } from './reportsEvents.js';
import { SwipeEvenetsRegister } from './swipeEvents.js';
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
                        ProfileStore.set(response.data.body);

                        eventBus.dispatch('user:data-requests');
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
    eventBus.register('user:data-requests', (payload?: string) => {
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

        ws.CreateConnect(wsURL)
            .then(wsRegister)
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
