import ViewBase from './viewBase.js';
import { viewSizes } from '../constants/viewParams.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { FormField } from '../components/common/formField.js';
import { Button } from '../components/common/button.js';
import { ErrorMsg } from '../components/common/errorMsg.js';
import { errorEmailMsg, errorPasswordMsg, errorRepeatPasswordMsg, errorSignupFormMsg } from '../constants/errorMsg.js';
import EventBus from '../dispatcher/eventBus.js';
import { SignupStore } from '../store/signupStore.js';
import { errorManager, ErrorStore } from '../store/errorStore.js';

import router from '../route/router.js';
import { Errors } from '../components/error/errors.js';
import { EVENTS } from '../dispatcher/events.js';

export default class SignupView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        this.viewSize = viewSizes.anyone;
        SignupStore.subscribe(this.subscribtionCallback, this);
        ErrorStore.subscribe(this.errorStoreUpdatesView, this);
        this._template = this._createTmpl();
    }

    _data = {
        'fields': {
            'email': {
                tag: 'input',
                type: 'text',
                placeholder: 'Почта',
                name: 'email',
                iconSrc: 'icons/email.svg',
                class: SignupStore.get().emailFieldClass,
                oninput: () => {
                    EventBus.dispatch<string>(EVENTS.SIGNUP_EMAIL_INPUT);
                },
                onfocusout: () => {
                    EventBus.dispatch<string>(EVENTS.SIGNUP_EMAIL_FOCUSOUT);
                },
            },
            'password': {
                tag: 'input',
                type: 'password',
                placeholder: 'Пароль',
                name: 'password',
                iconSrc: 'icons/password.svg',
                class: SignupStore.get().passwordFieldClass,
                oninput: () => {
                    EventBus.dispatch<string>(EVENTS.SIGNUP_PASSWORD_INPUT);
                },
                onfocusout: () => {
                    EventBus.dispatch<string>(EVENTS.SIGNUP_PASSWORD_FOCUSOUT);
                },
            },
            'repeatPassword': {
                tag: 'input',
                type: 'password',
                placeholder: 'Повторите пароль',
                name: 'password',
                iconSrc: 'icons/password.svg',
                class: SignupStore.get().repeatPasswordFieldClass,
                oninput: () => {
                    EventBus.dispatch<string>(EVENTS.SIGNUP_REPEAT_PASSWORD_INPUT);
                },
                onfocusout: () => {
                    EventBus.dispatch<string>(EVENTS.SIGNUP_REPEAT_PASSWORD_FOCUSOUT);
                },
            },
        },
        'buttons': {
            'signupButton': {
                type: 'button',
                text: 'Регистрация',
                class: 'button-white-big',
                onkeypress: (event) => {
                    const enterKeyCode = 13;
                    if (event.keyCode === enterKeyCode) {
                        event.preventDefault();
                        EventBus.dispatch<number>(EVENTS.SIGNUP_SIGNUP_BUTTON);
                    }
                },
                onclick: () => {
                    EventBus.dispatch<string>(EVENTS.SIGNUP_SIGNUP_BUTTON);
                },
            },
            'loginButton': {
                type: 'button',
                text: 'Вход',
                class: 'button-black-small',
                onclick: () => {
                    router.go('/login');
                },
            },
        },
        'links': {
            'login': {
                text: 'Вход',
                class: 'login-link',
                dataSection: 'login',
                route: '/login',
            },
        },
        'errorMsgs': {
            'emailError': {
                text: errorEmailMsg,
                class: SignupStore.get().emailErrorClass,
            },
            'passwordError': {
                text: errorPasswordMsg,
                class: SignupStore.get().passwordErrorClass,
            },
            'repeatPasswordError': {
                text: errorRepeatPasswordMsg,
                class: SignupStore.get().repeatPasswordErrorClass,
            },
            'formError': {
                text: errorSignupFormMsg,
                class: SignupStore.get().formErrorClass,
            },
        },
        error: errorManager.error,
    };

    _createTmpl() {
        return (
            <div class='flex_box_column_center'>
                <div class='header-medium'>Регистрация</div>
                {FormField(this._data.fields.email)}
                {ErrorMsg(this._data.errorMsgs.emailError)}
                {FormField(this._data.fields.password)}
                {ErrorMsg(this._data.errorMsgs.passwordError)}
                {FormField(this._data.fields.repeatPassword)}
                {ErrorMsg(this._data.errorMsgs.repeatPasswordError)}
                {ErrorMsg(this._data.errorMsgs.formError)}
                {Button(this._data.buttons.signupButton)}

                {Button(this._data.buttons.loginButton)}
                {Errors(this._data.error)}
            </div>
        );
    }

    public unsubscribe() {
        SignupStore.unsubscribe(this.subscribtionCallback);
        ErrorStore.unsubscribe(this.errorStoreUpdatesView);
    }

    private subscribtionCallback(data, view) {
        view._data.fields.email.class = data.emailFieldClass;
        view._data.fields.email.pass = data.emailPass;
        view._data.fields.password.class = data.passwordFieldClass;
        view._data.fields.password.pass = data.passwordPass;
        view._data.fields.repeatPassword.class = data.repeatPasswordFieldClass;
        view._data.fields.repeatPassword.pass = data.repeatPasswordPass;
        view._data.errorMsgs.emailError.class = data.emailErrorClass;
        view._data.errorMsgs.passwordError.class = data.passwordErrorClass;
        view._data.errorMsgs.repeatPasswordError.class = data.repeatPasswordErrorClass;
        view._data.errorMsgs.formError.class = data.formErrorClass;
        view._template = view._createTmpl(view._data);
        view.render();
    }

    private errorStoreUpdatesView(data, view) {
        view._data.error = errorManager.error;
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
