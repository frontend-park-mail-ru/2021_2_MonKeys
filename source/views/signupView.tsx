import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { FormField } from '../components/formField.js';
import { Button } from '../components/button.js';
import { Link } from '../components/link.js';
import { ErrorMsg } from '../components/errorMsg.js';
import { errorEmailMsg, errorPasswordMsg, errorRepeatPasswordMsg, errorSignupFormMsg } from '../constants/errorMsg.js';
import EventBus from '../dispatcher/eventBus.js';
import { SignupStore } from '../store/signupStore.js';
import { CritError } from '../components/critError.js';

export default class SignupView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        SignupStore.subscribe(this.subscribtionCallback, this);
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
                class: SignupStore.get().emailFieldClass,
                oninput: () => {
                    EventBus.dispatch<string>('signup:email-input');
                },
                onfocusout: () => {
                    EventBus.dispatch<string>('signup:email-focusout');
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
                    EventBus.dispatch<string>('signup:password-input');
                },
                onfocusout: () => {
                    EventBus.dispatch<string>('signup:password-focusout');
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
                    EventBus.dispatch<string>('signup:repeat-password-input');
                },
                onfocusout: () => {
                    EventBus.dispatch<string>('signup:repeat-password-focusout');
                },
            },
        },
        'buttons': {
            'signupButton': {
                type: 'button',
                text: 'Зарегистрироваться',
                class: 'signup',
                onclick: () => {
                    EventBus.dispatch<string>('signup:signup-button');
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
        'critError': {
            text: 'API не отвечает',
            loading: SignupStore.get().apiErrorLoadCondition,
        },
    };

    _createTmpl(data) {
        return (
            <div class='form-container'>
                <div class='center-container'>
                    <span class='page-header'>Регистрация</span>
                </div>
                <div class='center-container'>
                    <form class='login-form'>
                        <div class='drip-logo-bg'>
                            {FormField(this._data.fields.email)}
                            {ErrorMsg(this._data.errorMsgs.emailError)}
                            {FormField(this._data.fields.password)}
                            {ErrorMsg(this._data.errorMsgs.passwordError)}
                            {FormField(this._data.fields.repeatPassword)}
                            {ErrorMsg(this._data.errorMsgs.repeatPasswordError)}
                        </div>
                        {ErrorMsg(this._data.errorMsgs.formError)}
                        {Button(this._data.buttons.signupButton)}
                    </form>
                </div>
                {Link(this._data.links.login)}
                {CritError(data.critError)}
            </div>
        );
    }

    public unsubscribe() {
        SignupStore.unsubscribe(this.subscribtionCallback);
    }

    private subscribtionCallback(data, view) {
        view._data.fields.email.class = data.emailFieldClass;
        view._data.fields.password.class = data.passwordFieldClass;
        view._data.fields.repeatPassword.class = data.repeatPasswordFieldClass;
        view._data.errorMsgs.emailError.class = data.emailErrorClass;
        view._data.errorMsgs.passwordError.class = data.passwordErrorClass;
        view._data.errorMsgs.repeatPasswordError.class = data.repeatPasswordErrorClass;
        view._data.errorMsgs.formError.class = data.formErrorClass;
        view._data.critError.loading = data.apiErrorLoadCondition;
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
