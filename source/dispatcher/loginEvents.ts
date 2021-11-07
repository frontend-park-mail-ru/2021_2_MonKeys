import EventBus from './eventBus.js';
import { emailRegExp, passwordRegExp } from '../constants/validation.js';
import { HTTPNotFound, HTTPSuccess } from '../constants/HTTPStatus.js';
import { ProfileStore } from '../store/profileStore.js';
import router from '../route/router.js';
import { loginRequest } from '../requests/sessionRequest.js';
import { feedRequest } from '../requests/feedRequest.js';
import { LoginStore } from '../store/loginStore.js';
import feedStore from '../store/feedStore.js';

export const LoginEventRegister = () => {
    EventBus.register('login:login-button', (payload?: string) => {
        // ТОТАЛЬНЕЙШИЙ КРИНЖ ЭТО ДОЛЖНО БЫТЬ ЧЕРЕЗ ВИРТУАЛДОМ ПОТОМ
        // НО ПОКА ТАК ААААААААААААААА
        // ПОЛНЫЙ КРИНЖ АААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААА
        const _emailInput = document.getElementsByTagName('input')[0];
        const _passwordInput = document.getElementsByTagName('input')[1];

        const testEmail = emailRegExp.test(_emailInput.value);
        const testPassword = passwordRegExp.test(_passwordInput.value);

        const storeData = LoginStore.get();

        if (!testEmail) {
            storeData.emailFieldClass = 'form-field-novalid';
            storeData.emailErrorClass = 'login-error-active';
            LoginStore.set(storeData);
        }
        if (!testPassword) {
            storeData.passwordFieldClass = 'form-field-novalid';
            storeData.passwordErrorClass = 'login-error-active';
            LoginStore.set(storeData);
        }
        if (!testEmail || !testPassword) {
            return;
        }

        storeData.emailFieldClass = 'form-field-valid';
        storeData.emailErrorClass = 'login-error';
        storeData.passwordFieldClass = 'form-field-valid';
        storeData.passwordErrorClass = 'login-error';
        LoginStore.set(storeData);

        const _email = _emailInput.value.trim();
        const _password = _passwordInput.value.trim();

        //запрос
        loginRequest(_email, _password)
            .then((response) => {
                if (response.status === HTTPSuccess) {
                    if (response.data.status === HTTPSuccess) {
                        EventBus.dispatch<string>('user:cookie-requests');
                    } else if (response.data.status === HTTPNotFound) {
                        storeData.formErrorClass = 'login-error-active';
                        LoginStore.set(storeData);
                    }
                    window.csrfToken = response.csrf;
                    console.log(window.csrfToken);
                } else {
                    // server internal error
                    storeData.apiErrorLoadCondition = true;
                    LoginStore.set(storeData);
                }
            })
            .catch(() => {
                storeData.apiErrorLoadCondition = true;
                LoginStore.set(storeData);
            });
    });

    EventBus.register('login:email-input', (payload?: string) => {
        const _emailInput = document.getElementsByTagName('input')[0];

        const storeData = LoginStore.get();
        if (!_emailInput) {
            console.log('Error, trying to read _emailInput on wrong view');
            return;
        }
        const test = _emailInput.value.length === 0 || emailRegExp.test(_emailInput.value);

        test ? (storeData.emailFieldClass = 'form-field-valid') : (storeData.emailFieldClass = 'form-field-novalid');

        if (test && storeData.emailErrorClass === 'login-error-active') {
            storeData.emailErrorClass = 'login-error';
        }

        if (storeData.formErrorClass === 'login-error-active') {
            storeData.formErrorClass = 'login-error';
        }

        LoginStore.set(storeData);
    });

    EventBus.register('login:email-focusout', (payload?: string) => {
        const _emailInput = document.getElementsByTagName('input')[0];

        const storeData = LoginStore.get();

        const test = _emailInput.value.length === 0 || emailRegExp.test(_emailInput.value);
        if (test) {
            storeData.emailFieldClass = 'form-field-valid';
            storeData.emailErrorClass = 'login-error';
        } else {
            storeData.emailFieldClass = 'form-field-novalid';
            storeData.emailErrorClass = 'login-error-active';
        }

        LoginStore.set(storeData);
    });

    EventBus.register('login:password-input', (payload?: string) => {
        const _passwordInput = document.getElementsByTagName('input')[1];
        if (!_passwordInput) {
            console.log('Error, trying to read _emailInput on wrong view');
            return;
        }
        const storeData = LoginStore.get();

        const test = _passwordInput.value.length === 0 || passwordRegExp.test(_passwordInput.value);
        test
            ? (storeData.passwordFieldClass = 'form-field-valid')
            : (storeData.passwordFieldClass = 'form-field-novalid');

        if (test && storeData.passwordErrorClass === 'login-error-active') {
            storeData.passwordErrorClass = 'login-error';
        }

        if (storeData.formErrorClass === 'login-error-active') {
            storeData.formErrorClass = 'login-error';
        }

        LoginStore.set(storeData);
    });

    EventBus.register('login:password-focusout', (payload?: string) => {
        const _passwordInput = document.getElementsByTagName('input')[1];

        const storeData = LoginStore.get();

        const test = _passwordInput.value.length === 0 || passwordRegExp.test(_passwordInput.value);
        if (test) {
            storeData.passwordFieldClass = 'form-field-valid';
            storeData.passwordErrorClass = 'login-error';
        } else {
            storeData.passwordFieldClass = 'form-field-novalid';
            storeData.passwordErrorClass = 'login-error-active';
        }

        LoginStore.set(storeData);
    });
};
