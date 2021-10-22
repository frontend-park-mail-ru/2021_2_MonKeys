import EventBus from "./eventBus.js"
import { loginRequest } from "../requests/sessionRequest.js";
import router from '../route/router.js';
import { emailRegExp, passwordRegExp } from "../constants/validation.js";
import { HTTPEMailNotFound, HTTPNotFound, HTTPSuccess } from "../constants/HTTPStatus.js";
import { ProfileStore } from "../store/profileStore.js";
import { feedRequest } from "../requests/feedRequest.js";
import { createProfile } from "../requests/profileRequest.js";
import { loginEventRegister } from "./loginEvents.js";
import { signupEventRegister } from "./signupEvents.js";
import { SignupEditEventRegister } from "./editEvents.js";
const $root = document.getElementById('app');

export const InitBus = () => {
    // -------------------------login-----------------------------
    loginEventRegister();
    // -------------------------signup----------------------------
    signupEventRegister();
    // -------------------edit-after-signup-----------------------
    SignupEditEventRegister();
}