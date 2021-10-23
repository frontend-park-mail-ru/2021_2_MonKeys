import EventBus from "./eventBus.js"
import { loginRequest } from "../requests/sessionRequest.js";
import router from '../route/router.js';
import { emailRegExp, passwordRegExp } from "../constants/validation.js";
import { HTTPEMailNotFound, HTTPNotFound, HTTPSuccess } from "../constants/HTTPStatus.js";
import { ProfileStore } from "../store/profileStore.js";
import { feedRequest } from "../requests/feedRequest.js";
import { createProfile } from "../requests/profileRequest.js";
import { LoginEventRegister } from "./loginEvents.js";
import { SignupEventRegister } from "./signupEvents.js";
import { SignupEditEventRegister } from "./editEvents.js";
import { ProfileEventsRegister } from "./profileEvents.js";
import { LikesEventsRegister } from "./likesEvents.js";
import { FeedEventsRegister } from "./feedEvents.js";
import { ChatEventsRegister } from "./chatEvents.js";
const $root = document.getElementById('app');

export const InitBus = () => {
    // -------------------------login-----------------------------
    LoginEventRegister();
    // -------------------------signup----------------------------
    SignupEventRegister();
    // -------------------edit-after-signup-----------------------
    SignupEditEventRegister();
    // ---------------------------edit----------------------------
    
     // ----------------------------profile-----------------------
    ProfileEventsRegister();
    // ----------------------likes--------------------------------
    LikesEventsRegister();
    // -------------------feed------------------------------------
    FeedEventsRegister();
    // -------------------chat------------------------------------
    ChatEventsRegister();
}