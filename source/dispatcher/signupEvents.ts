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
            storeData.emailFieldClass = 'form__field-invalid';
            storeData.emailErrorClass = 'error-active';
            SignupStore.set(storeData);
        }
        if (!testPassword) {
            storeData.passwordFieldClass = 'form__field-invalid';
            storeData.passwordErrorClass = 'error-active';
            SignupStore.set(storeData);
        }
        if (!testRepeatPassword) {
            storeData.repeatPasswordFieldClass = 'form__field-invalid';
            storeData.repeatPasswordErrorClass = 'error-active';
            SignupStore.set(storeData);
        }
        if (!testEmail || !testPassword || !testRepeatPassword) {
            return;
        }

        storeData.emailFieldClass = 'form__field-valid';
        storeData.emailErrorClass = 'error-inactive';
        storeData.passwordFieldClass = 'form__field-valid';
        storeData.passwordErrorClass = 'error-inactive';
        storeData.repeatPasswordFieldClass = 'form__field-valid';
        storeData.repeatPasswordErrorClass = 'error-inactive';
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
                        storeData.formErrorClass = 'error-active';
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
        test ? (storeData.emailFieldClass = 'form__field-valid') : (storeData.emailFieldClass = 'form__field-invalid');

        if (test && storeData.emailErrorClass === 'error-active') {
            storeData.emailErrorClass = 'error-inactive';
        }

        if (storeData.formErrorClass === 'error-active') {
            storeData.formErrorClass = 'error-inactive';
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
            storeData.emailFieldClass = 'form__field-valid';
            storeData.emailErrorClass = 'error-inactive';
        } else {
            storeData.emailFieldClass = 'form__field-invalid';
            storeData.emailErrorClass = 'error-active';
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
            ? (storeData.passwordFieldClass = 'form__field-valid')
            : (storeData.passwordFieldClass = 'form__field-invalid');

        if (test && storeData.passwordErrorClass === 'error-active') {
            storeData.passwordErrorClass = 'error-inactive';
        }

        if (storeData.formErrorClass === 'error-active') {
            storeData.formErrorClass = 'error-inactive';
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
            storeData.passwordFieldClass = 'form__field-valid';
            storeData.passwordErrorClass = 'error-inactive';
        } else {
            storeData.passwordFieldClass = 'form__field-invalid';
            storeData.passwordErrorClass = 'error-active';
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
            ? (storeData.repeatPasswordFieldClass = 'form__field-valid')
            : (storeData.repeatPasswordFieldClass = 'form__field-invalid');

        if (test && storeData.repeatPasswordErrorClass === 'error-active') {
            storeData.repeatPasswordErrorClass = 'error-inactive';
        }

        if (storeData.formErrorClass === 'error-active') {
            storeData.formErrorClass = 'error-inactive';
        }

        SignupStore.set(storeData);
    });

    EventBus.register('signup:repeat-password-focusout', (payload?: string) => {
        const _passwordInput = document.getElementsByTagName('input')[1];
        const _repeatPasswordInput = document.getElementsByTagName('input')[2];
        const _repeatPasswordError = document.getElementsByName('error-inactive')[2];

        const storeData = SignupStore.get();
        storeData.apiErrorLoadCondition = false;
        SignupStore.set(storeData);

        const test = _passwordInput.value === _repeatPasswordInput.value;
        if (test) {
            storeData.repeatPasswordFieldClass = 'form__field-valid';
            storeData.repeatPasswordErrorClass = 'error-inactive';
        } else {
            storeData.repeatPasswordFieldClass = 'form__field-invalid';
            storeData.repeatPasswordErrorClass = 'error-active';
        }

        SignupStore.set(storeData);
    });
};
