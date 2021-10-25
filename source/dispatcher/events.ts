import EventBus from "./eventBus.js"
import { loginRequest } from "../requests/sessionRequest.js";
import router from '../route/router.js';
import { emailRegExp, passwordRegExp } from "../constants/validation.js";
import { HTTPEMailNotFound, HTTPNotFound, HTTPSuccess } from "../constants/HTTPStatus.js";
import { ProfileStore } from "../store/profileStore.js";
import { feedRequest } from "../requests/feedRequest.js";
import { getProfile } from "../requests/profileRequest.js";
// import { cookieRequest } from "../requests/sessionRequest.js";
import { LoginEventRegister } from "./loginEvents.js";
import { SignupEventRegister } from "./signupEvents.js";
import { EditEventRegister } from "./editEvents.js";
import { ProfileEventsRegister } from "./profileEvents.js";
import { LikesEventsRegister } from "./likesEvents.js";
import { FeedEventsRegister } from "./feedEvents.js";
import { ChatEventsRegister } from "./chatEvents.js";
import eventBus from "./eventBus.js";
const $root = document.getElementById('app');

export const InitBus = () => {
    eventBus.register('user:logged-in', (payload?:string) => {
        getProfile()
            .then(
                (response) => {
                    if (response.status === HTTPSuccess) {
                        if (response.data.status === HTTPSuccess) {
                            ProfileStore.set(response.data.body);
                            router.go('/matches');
                        } else {
                            console.log('error');
                        }
                    } else {
                        // server internal error
                        console.log('server internal error');
                    }
                }
            );
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
}