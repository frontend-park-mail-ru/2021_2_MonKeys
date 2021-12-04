import ViewBase from './viewBase.js';
import { viewSizes } from '../constants/viewParams.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { FormField } from '../components/common/formField.js';
import { Button } from '../components/common/button.js';
import { ErrorMsg } from '../components/common/errorMsg.js';
import { errorEmailMsg, errorPasswordMsg, errorLoginFormMsg } from '../constants/errorMsg.js';
import EventBus from '../dispatcher/eventBus.js';
import { LoginStore } from '../store/loginStore.js';
import { errorManager, ErrorStore } from '../store/errorStore.js';

import router from '../route/router.js';
import { Errors } from '../components/error/errors.js';
import { EVENTS } from '../dispatcher/events.js';
export default class LoginView extends ViewBase {
    public unsubscribe() {
        LoginStore.unsubscribe(this.subscribtionCallback);
        ErrorStore.unsubscribe(this.errorStoreUpdatesView);
    }

    private subscribtionCallback(data, view) {
        view._data.fields.email.class = data.emailFieldClass;
        view._data.fields.email.pass = data.emailPass;
        view._data.fields.password.class = data.passwordFieldClass;
        view._data.fields.password.pass = data.passwordPass;
        view._data.errorMsgs.emailError.class = data.emailErrorClass;
        view._data.errorMsgs.passwordError.class = data.passwordErrorClass;
        view._data.errorMsgs.formError.class = data.formErrorClass;
        view._template = view._createTmpl(view._data);
        view.render();
    }

    private errorStoreUpdatesView(data, view) {
        view._data.error = errorManager.error;
        view._template = view._createTmpl(view._data);
        view.render();
    }

    constructor(parent: HTMLElement) {
        super(parent);
        this.viewSize = viewSizes.anyone;
        LoginStore.subscribe(this.subscribtionCallback, this);
        ErrorStore.subscribe(this.errorStoreUpdatesView, this);
        this._template = this._createTmpl(this._data);
    }

    _data = {
        'fields': {
            'email': {
                tag: 'input',
                type: 'text',
                placeholder: 'Почта',
                name: 'email',
                iconSrc: 'icons/email.svg',
                class: LoginStore.get().emailFieldClass,
                pass: false,
                oninput: () => {
                    EventBus.dispatch<string>(EVENTS.LOGIN_EMAIL_INPUT);
                },
                onfocusout: () => {
                    EventBus.dispatch<string>(EVENTS.LOGIN_EMAIL_FOCUSOUT);
                },
            },
            'password': {
                tag: 'input',
                type: 'password',
                placeholder: 'Пароль',
                name: 'password',
                iconSrc: 'icons/password.svg',
                class: LoginStore.get().passwordFieldClass,
                pass: false,
                oninput: () => {
                    EventBus.dispatch<string>(EVENTS.LOGIN_PASSWORD_INPUT);
                },
                onfocusout: () => {
                    EventBus.dispatch<string>(EVENTS.LOGIN_PASSWORD_FOCUSOUT);
                },
            },
        },
        'buttons': {
            'loginButton': {
                type: 'button',
                text: 'Войти',
                class: 'button-white-small',
                onclick: () => {
                    EventBus.dispatch<string>(EVENTS.LOGIN_BUTTON_WHITE);
                },
            },
            'signupButton': {
                type: 'button',
                text: 'Регистрация',
                class: 'button-black-big',
                onclick: () => {
                    router.go('/signup');
                },
            },
        },
        'errorMsgs': {
            'emailError': {
                text: errorEmailMsg,
                class: LoginStore.get().emailErrorClass,
            },
            'passwordError': {
                text: errorPasswordMsg,
                class: LoginStore.get().passwordErrorClass,
            },
            'formError': {
                text: errorLoginFormMsg,
                class: LoginStore.get().formErrorClass,
            },
        },
        error: errorManager.error,
    };

    _createTmpl(data) {
        return (
            <div class='flex_box_column_center'>
                <div class='header-big'>Drip</div>

                {FormField(data.fields.email)}
                {ErrorMsg(data.errorMsgs.emailError)}

                {FormField(data.fields.password)}
                {ErrorMsg(data.errorMsgs.passwordError)}
                {ErrorMsg(data.errorMsgs.formError)}
                {Button(data.buttons.loginButton)}
                {Button(data.buttons.signupButton)}
                {Errors(data.error)}
            </div>
        );
    }
}
