import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { FormField } from '../components/formField.js';
import { Button } from '../components/button.js';
import { Link } from '../components/link.js';
import { ErrorMsg } from '../components/errorMsg.js';
import { errorEmailMsg, errorPasswordMsg, errorLoginFormMsg } from '../constants/errorMsg.js';
import EventBus from '../dispatcher/eventBus.js';
import { LoginStore } from '../store/loginStore.js';
import { CritError } from '../components/critError.js';
import { ErrorStore } from '../store/errorStore.js';
import router from '../route/router.js';
import { dropsBackground } from '../components/dropsBackground.js';

export default class LoginView extends ViewBase {
    public unsubscribe() {
        LoginStore.unsubscribe(this.subscribtionCallback);
        ErrorStore.unsubscribe(this.errorStoreUpdatesView);
    }

    private subscribtionCallback(data, view) {
        view._data.fields.email.class = data.emailFieldClass;
        view._data.fields.password.class = data.passwordFieldClass;
        view._data.errorMsgs.emailError.class = data.emailErrorClass;
        view._data.errorMsgs.passwordError.class = data.passwordErrorClass;
        view._data.errorMsgs.formError.class = data.formErrorClass;
        view._data.critError.loading = data.apiErrorLoadCondition;
        view._template = view._createTmpl(view._data);
        view.render();
    }

    private errorStoreUpdatesView(data, view) {
        view._data.critError.loading = data.apiErrorLoadCondition;
        view._template = view._createTmpl(view._data);
        view.render();
    }

    constructor(parent: HTMLElement) {
        super(parent);
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
                oninput: () => {
                    EventBus.dispatch<string>('login:email-input');
                },
                onfocusout: () => {
                    EventBus.dispatch<string>('login:email-focusout');
                },
            },
            'password': {
                tag: 'input',
                type: 'password',
                placeholder: 'Пароль',
                name: 'password',
                iconSrc: 'icons/password.svg',
                class: LoginStore.get().passwordFieldClass,
                oninput: () => {
                    EventBus.dispatch<string>('login:password-input');
                },
                onfocusout: () => {
                    EventBus.dispatch<string>('login:password-focusout');
                },
            },
        },
        'buttons': {
            'loginButton': {
                type: 'button',
                text: 'Войти',
                class: 'button-white-small',
                onclick: () => {
                    EventBus.dispatch<string>('login:button-white');
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
        'critError': {
            title: 'Ошибка подключения',
            text: 'Не удаётся подключиться к серверу. Проверь подключение к Интернету и попробуй снова.',
            loading: ErrorStore.get().apiErrorLoadCondition,
        },
    };

    _createTmpl(data) {
        return (
            <div class="flex_box_column_center">
                {dropsBackground()}
                <div class="header-big">
                    Drip
                </div>
                
                {FormField(data.fields.email)}
                {ErrorMsg(data.errorMsgs.emailError)}
                
                {FormField(data.fields.password)}
                {ErrorMsg(data.errorMsgs.passwordError)}
                {/* {ErrorMsg(data.errorMsgs.formError)} */}
                {Button(data.buttons.loginButton)}
                {Button(data.buttons.signupButton)}
                {/* {CritError(data.critError)} */}
            </div>
        );
    }
}
