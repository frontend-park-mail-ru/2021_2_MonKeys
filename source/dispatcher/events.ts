import router from '../route/router.js';

import { HTTPSuccess } from '../utils/constants/HTTPStatus.js';
import { ProfileStore } from '../store/profileStore.js';
import { feedRequest } from '../requests/feedRequest.js';
import { getProfileRequest } from '../requests/profileRequest.js';

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
import { getChatsRequest } from '../requests/chatsRequest.js';
import { userLikesRequset } from '../requests/likesRequest.js';
import { chatsManager } from '../store/chatsStore.js';
import { ReportsEventsRegister } from './reportsEvents.js';
import { SwipeEvenetsRegister } from './swipeEvents.js';
import { ConnectWS, initWS } from '../requests/messageWS.js';

export const enum EVENTS {
    CAROUSEL_NEXT,
    CAROUSEL_PREVIOUS,
    CHAT_INPUT_MESSAGE,
    CHAT_SEND_BUTTON,
    CHAT_NEW_MESSAGE,
    CHAT_BACK_BUTTON,
    CHAT_SEARCH,
    CHAT_OPEN_PROFILE,
    CHAT_BACK_TO_CHAT_BUTTON,
    CHATS_PREVIEW_CHAT,
    CHATS_NEW_CHAT,
    EDIT_SAVE_BUTTON,
    EDIT_OPEN_TAGS,
    EDIT_CHANGE_TAG_CONDITION,
    EDIT_NAME_INPUT,
    EDIT_NAME_FOCUSOUT,
    EDIT_BIRTH_DATE_INPUT,
    EDIT_BIRTH_DATE_FOCUSOUT,
    EDIT_IMG_INPUT,
    EDIT_IMG_DELETE,
    EDIT_TAGS_CLICK,
    EDIT_TAG_CLICK,
    EDIT_GENDER_MALE_CLICK,
    EDIT_GENDER_FEMALE_CLICK,
    EDIT_PREFER_MALE_CLICK,
    EDIT_PREFER_FEMALE_CLICK,
    EDIT_PREFER_ANY_CLICK,
    ERROR_OK_BUTTON,
    USER_COOKIE_REQUESTS,
    USER_DATA_REQUESTS,
    LIKES_EXPAND_BUTTON,
    LIKES_SHRINK_BUTTON,
    LIKES_REACTION,
    LIKES_CHOICE_PAYMENT,
    LIKES_PAYMENT,
    LOGIN_BUTTON_WHITE,
    LOGIN_EMAIL_INPUT,
    LOGIN_EMAIL_FOCUSOUT,
    LOGIN_PASSWORD_INPUT,
    LOGIN_PASSWORD_FOCUSOUT,
    PROFILE_EDIT_BUTTON,
    PROFILE_LOGOUT_BUTTON,
    REPORTS_REPORT_BUTTON,
    REPORTS_BACK_BUTTON,
    REPORTS_DECLARE_BUTTON,
    REPORTS_CHOOSE_REPORT_TYPE,
    SIGNUP_SIGNUP_BUTTON,
    SIGNUP_EMAIL_INPUT,
    SIGNUP_EMAIL_FOCUSOUT,
    SIGNUP_PASSWORD_INPUT,
    SIGNUP_PASSWORD_FOCUSOUT,
    SIGNUP_REPEAT_PASSWORD_INPUT,
    SIGNUP_REPEAT_PASSWORD_FOCUSOUT,
    SWIPE_START,
    SWIPE_MOVE,
    SWIPE_END,
    FEED_LIKE_BUTTON,
    FEED_DISLIKE_BUTTON,
    FEED_EXPAND_BUTTON,
    FEED_SHRINK_BUTTON,
    FEED_REACTION,
}

export const InitBus = () => {
    eventBus.register(EVENTS.USER_COOKIE_REQUESTS, () => {
        getProfileRequest().then((data) => {
            if (data.status !== HTTPSuccess) {
                router.go('/login');
                return;
            }

            const profile = data.body;

            if (profile.name) {
                AuthStore.set({
                    loggedIn: userStatus.loggedIn,
                });
                ProfileStore.set(profile);

                eventBus.dispatch(EVENTS.USER_DATA_REQUESTS);
            } else {
                AuthStore.set({
                    loggedIn: userStatus.Signup,
                });
                router.go('/signup-edit');
            }
        });
    });
    eventBus.register(EVENTS.USER_DATA_REQUESTS, () => {
        if (AuthStore.get().loggedIn !== userStatus.loggedIn) {
            return;
        }

        matchRequest().then((data) => {
            const matchesData = MatchesStore.get();
            matchesData.matches = data.body.allUsers;
            matchesData.matchesTotal = data.body.matchesCount;
            MatchesStore.set(matchesData);
        });
        userLikesRequset().then((data) => {
            const likesData = LikesStore.get();
            likesData.profiles = data.body.allUsers;
            likesData.likesCount = data.body.likesCount;
            likesData.expended = false;
            likesData.reported = false;
            likesData.userIndex = 0;
            LikesStore.set(likesData);
        });

        feedRequest().then((data) => {
            const feed = feedStore.get();
            if (data.body.Users !== null) {
                feed.profiles = data.body.Users;
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

        getChatsRequest().then((data) => {
            chatsManager.chats = data.body.Chats;
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
