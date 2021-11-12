import EventBus from './eventBus.js';
import { emailRegExp, passwordRegExp } from '../constants/validation.js';
import { HTTPEMailNotFound, HTTPSuccess } from '../constants/HTTPStatus.js';
import router from '../route/router.js';
import { createProfile } from '../requests/profileRequest.js';
import { SignupStore } from '../store/signupStore.js';
import AuthStore from '../store/authStore.js';
import { userStatus } from '../constants/userStatus.js';

export const SignupEventRegister = () => {
    EventBus.register('signup:signup-button', (payload?: string) => {
        const _emailInput = document.getElementsByTagName('input')[0];
        const _passwordInput = document.getElementsByTagName('input')[1];
        const _repeatPasswordInput = document.getElementsByTagName('input')[2];

        const testEmail = emailRegExp.test(_emailInput.value);
        const testPassword = passwordRegExp.test(_passwordInput.value);
        const testRepeatPassword = _passwordInput.value === _repeatPasswordInput.value;

        const storeData = SignupStore.get();
        storeData.apiErrorLoadCondition = false;
        SignupStore.set(storeData);

        if (!testEmail) {
            storeData.emailFieldClass = 'form-field-novalid';
            storeData.emailErrorClass = 'login-error-active';
            SignupStore.set(storeData);
        }
        if (!testPassword) {
            storeData.passwordFieldClass = 'form-field-novalid';
            storeData.passwordErrorClass = 'login-error-active';
            SignupStore.set(storeData);
        }
        if (!testRepeatPassword) {
            storeData.repeatPasswordFieldClass = 'form-field-novalid';
            storeData.repeatPasswordErrorClass = 'login-error-active';
            SignupStore.set(storeData);
        }
        if (!testEmail || !testPassword || !testRepeatPassword) {
            return;
        }

        storeData.emailFieldClass = 'form-field-valid';
        storeData.emailErrorClass = 'login-error';
        storeData.passwordFieldClass = 'form-field-valid';
        storeData.passwordErrorClass = 'login-error';
        storeData.repeatPasswordFieldClass = 'form-field-valid';
        storeData.repeatPasswordErrorClass = 'login-error';
        SignupStore.set(storeData);

        const _email = _emailInput.value.trim();
        const _password = _passwordInput.value.trim();

        createProfile(_email, _password)
            .then((response) => {
                if (response.status === HTTPSuccess) {
                    if (response.data.status === HTTPSuccess) {
                        // пасхалочк// пасхалоч// пасхалочк// пасхалочк// пасхалочк// пасхалочк// пасхалочкааааакаа
                        AuthStore.set({
                            loggedIn: userStatus.Signup,
                        });
                        router.go('/signup-edit');
                    } else if (response.data.status === HTTPEMailNotFound) {
                        storeData.formErrorClass = 'login-error-active';
                        SignupStore.set(storeData);
                    }
                } else {
                    storeData.apiErrorLoadCondition = true;
                    SignupStore.set(storeData);
                }
            })
            .catch(() => {
                storeData.apiErrorLoadCondition = true;
                SignupStore.set(storeData);
            });
    });

    EventBus.register('signup:email-input', (payload?: string) => {
        const _emailInput = document.getElementsByTagName('input')[0];

        const storeData = SignupStore.get();
        storeData.apiErrorLoadCondition = false;
        SignupStore.set(storeData);

        const test = _emailInput.value.length === 0 || emailRegExp.test(_emailInput.value);
        test ? (storeData.emailFieldClass = 'form-field-valid') : (storeData.emailFieldClass = 'form-field-novalid');

        if (test && storeData.emailErrorClass === 'login-error-active') {
            storeData.emailErrorClass = 'login-error';
        }

        if (storeData.formErrorClass === 'login-error-active') {
            storeData.formErrorClass = 'login-error';
        }

        SignupStore.set(storeData);
    });

    EventBus.register('signup:email-focusout', (payload?: string) => {
        const _emailInput = document.getElementsByTagName('input')[0];

        const storeData = SignupStore.get();
        storeData.apiErrorLoadCondition = false;
        SignupStore.set(storeData);

        const test = _emailInput.value.length === 0 || emailRegExp.test(_emailInput.value);
        if (test) {
            storeData.emailFieldClass = 'form-field-valid';
            storeData.emailErrorClass = 'login-error';
        } else {
            storeData.emailFieldClass = 'form-field-novalid';
            storeData.emailErrorClass = 'login-error-active';
        }

        SignupStore.set(storeData);
    });

    EventBus.register('signup:password-input', (payload?: string) => {
        const _passwordInput = document.getElementsByTagName('input')[1];

        const storeData = SignupStore.get();
        storeData.apiErrorLoadCondition = false;
        SignupStore.set(storeData);

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

        SignupStore.set(storeData);
    });

    EventBus.register('signup:password-focusout', (payload?: string) => {
        const _passwordInput = document.getElementsByTagName('input')[1];

        const storeData = SignupStore.get();
        storeData.apiErrorLoadCondition = false;
        SignupStore.set(storeData);

        const test = _passwordInput.value.length === 0 || passwordRegExp.test(_passwordInput.value);
        if (test) {
            storeData.passwordFieldClass = 'form-field-valid';
            storeData.passwordErrorClass = 'login-error';
        } else {
            storeData.passwordFieldClass = 'form-field-novalid';
            storeData.passwordErrorClass = 'login-error-active';
        }

        SignupStore.set(storeData);
    });

    EventBus.register('signup:repeat-password-input', (payload?: string) => {
        const _passwordInput = document.getElementsByTagName('input')[1];
        const _repeatPasswordInput = document.getElementsByTagName('input')[2];

        const storeData = SignupStore.get();
        storeData.apiErrorLoadCondition = false;
        SignupStore.set(storeData);

        const test = _passwordInput.value === _repeatPasswordInput.value;
        test
            ? (storeData.repeatPasswordFieldClass = 'form-field-valid')
            : (storeData.repeatPasswordFieldClass = 'form-field-novalid');

        if (test && storeData.repeatPasswordErrorClass === 'login-error-active') {
            storeData.repeatPasswordErrorClass = 'login-error';
        }

        if (storeData.formErrorClass === 'login-error-active') {
            storeData.formErrorClass = 'login-error';
        }

        SignupStore.set(storeData);
    });

    EventBus.register('signup:repeat-password-focusout', (payload?: string) => {
        const _passwordInput = document.getElementsByTagName('input')[1];
        const _repeatPasswordInput = document.getElementsByTagName('input')[2];
        const _repeatPasswordError = document.getElementsByName('error')[2];

        const storeData = SignupStore.get();
        storeData.apiErrorLoadCondition = false;
        SignupStore.set(storeData);

        const test = _passwordInput.value === _repeatPasswordInput.value;
        if (test) {
            storeData.repeatPasswordFieldClass = 'form-field-valid';
            storeData.repeatPasswordErrorClass = 'login-error';
        } else {
            storeData.repeatPasswordFieldClass = 'form-field-novalid';
            storeData.repeatPasswordErrorClass = 'login-error-active';
        }

        SignupStore.set(storeData);
    });
};
