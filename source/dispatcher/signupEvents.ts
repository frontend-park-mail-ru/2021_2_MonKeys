import EventBus from './eventBus.js';
import { emailRegExp, passwordRegExp } from '../constants/validation.js';
import { HTTPEMailNotFound, HTTPSuccess } from '../utils/constants/HTTPStatus.js';
import router from '../route/router.js';
import { createProfileRequest } from '../requests/profileRequest.js';
import { SignupStore } from '../store/signupStore.js';
import AuthStore from '../store/authStore.js';
import { userStatus } from '../constants/userStatus.js';
import { EVENTS } from './events.js';

export const SignupEventRegister = () => {
    EventBus.register(EVENTS.SIGNUP_SIGNUP_BUTTON, () => {
        const _emailInput = document.getElementsByTagName('input')[0];
        const _passwordInput = document.getElementsByTagName('input')[1];
        const _repeatPasswordInput = document.getElementsByTagName('input')[2];

        const testEmail = emailRegExp.test(_emailInput.value);
        const testPassword = passwordRegExp.test(_passwordInput.value);
        const testRepeatPassword = _passwordInput.value === _repeatPasswordInput.value;

        const storeData = SignupStore.get();

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

        createProfileRequest(_email, _password).then((data) => {
            if (data.status === HTTPSuccess) {
                AuthStore.set({
                    loggedIn: userStatus.Signup,
                });
                router.go('/signup-edit');
            } else if (data.status === HTTPEMailNotFound) {
                storeData.formErrorClass = 'error-active';
                SignupStore.set(storeData);
            }
        });
    });

    EventBus.register(EVENTS.SIGNUP_EMAIL_INPUT, () => {
        const _emailInput = document.getElementsByTagName('input')[0];

        const storeData = SignupStore.get();

        const test = _emailInput.value.length === 0 || emailRegExp.test(_emailInput.value);
        if (!test || !_emailInput.value) {
            storeData.emailPass = false;
        }
        test ? (storeData.emailFieldClass = 'form__field-valid') : (storeData.emailFieldClass = 'form__field-invalid');
        if (!test && storeData.emailErrorClass !== 'error-active') {
            storeData.emailErrorClass = 'error-hint';
        }
        if (test && (storeData.emailErrorClass === 'error-active' || storeData.emailErrorClass === 'error-hint')) {
            storeData.emailErrorClass = 'error-inactive';
            if (_emailInput.value) storeData.emailPass = true;
        }

        if (storeData.emailErrorClass === 'error-active' || storeData.emailErrorClass === 'error-hint') {
            storeData.formErrorClass = 'error-inactive';
        }

        SignupStore.set(storeData);
    });

    EventBus.register(EVENTS.SIGNUP_EMAIL_FOCUSOUT, () => {
        const _emailInput = document.getElementsByTagName('input')[0];

        const storeData = SignupStore.get();

        if (_emailInput.value.length !== 0) {
            const test = emailRegExp.test(_emailInput.value);
            if (test) {
                storeData.emailFieldClass = 'form__field-valid';
                storeData.emailErrorClass = 'error-inactive';
            } else {
                storeData.emailFieldClass = 'form__field-invalid';
                storeData.emailErrorClass = 'error-active';
            }
        }

        SignupStore.set(storeData);
    });

    EventBus.register(EVENTS.SIGNUP_PASSWORD_INPUT, () => {
        const _passwordInput = document.getElementsByTagName('input')[1];
        const _repeatPasswordInput = document.getElementsByTagName('input')[2];

        const storeData = SignupStore.get();

        const test = _passwordInput.value.length === 0 || passwordRegExp.test(_passwordInput.value);
        if (!test || !_passwordInput.value) {
            storeData.passwordPass = false;
        }
        test
            ? (storeData.passwordFieldClass = 'form__field-valid')
            : (storeData.passwordFieldClass = 'form__field-invalid');
        if (!test && storeData.passwordErrorClass !== 'error-active') {
            storeData.passwordErrorClass = 'error-hint';
        }
        if (
            test &&
            (storeData.passwordErrorClass === 'error-active' || storeData.passwordErrorClass === 'error-hint')
        ) {
            storeData.passwordErrorClass = 'error-inactive';
            if (_passwordInput.value) storeData.passwordPass = true;
        }

        if (storeData.passwordErrorClass === 'error-active' || storeData.passwordErrorClass === 'error-hint') {
            storeData.formErrorClass = 'error-inactive';
        }

        const testRepeat =
            _passwordInput.value === _repeatPasswordInput.value || _repeatPasswordInput.value.length === 0;
        console.log('test', testRepeat);
        if (!testRepeat || !_repeatPasswordInput.value) {
            storeData.repeatPasswordPass = false;
        }
        testRepeat
            ? (storeData.repeatPasswordFieldClass = 'form__field-valid')
            : (storeData.repeatPasswordFieldClass = 'form__field-invalid');
        if (!testRepeat && storeData.repeatPasswordErrorClass !== 'error-active') {
            storeData.repeatPasswordErrorClass = 'error-hint';
        }
        if (
            testRepeat &&
            (storeData.repeatPasswordErrorClass === 'error-active' ||
                storeData.repeatPasswordErrorClass === 'error-hint')
        ) {
            storeData.repeatPasswordErrorClass = 'error-inactive';
            if (_passwordInput.value) storeData.repeatPasswordPass = true;
        }

        if (
            storeData.repeatPasswordErrorClass === 'error-active' ||
            storeData.repeatPasswordErrorClass === 'error-hint'
        ) {
            storeData.formErrorClass = 'error-inactive';
        }

        SignupStore.set(storeData);
    });

    EventBus.register(EVENTS.SIGNUP_PASSWORD_FOCUSOUT, () => {
        const _passwordInput = document.getElementsByTagName('input')[1];

        const storeData = SignupStore.get();

        if (_passwordInput.value.length !== 0) {
            const test = passwordRegExp.test(_passwordInput.value);
            if (test) {
                storeData.passwordFieldClass = 'form__field-valid';
                storeData.passwordErrorClass = 'error-inactive';
            } else {
                storeData.passwordFieldClass = 'form__field-invalid';
                storeData.passwordErrorClass = 'error-active';
            }
        }

        SignupStore.set(storeData);
    });

    EventBus.register(EVENTS.SIGNUP_REPEAT_PASSWORD_INPUT, () => {
        const _passwordInput = document.getElementsByTagName('input')[1];
        const _repeatPasswordInput = document.getElementsByTagName('input')[2];

        const storeData = SignupStore.get();

        const test = _passwordInput.value === _repeatPasswordInput.value;
        if (!test || !_repeatPasswordInput.value) {
            storeData.repeatPasswordPass = false;
        }
        test
            ? (storeData.repeatPasswordFieldClass = 'form__field-valid')
            : (storeData.repeatPasswordFieldClass = 'form__field-invalid');
        if (!test && storeData.repeatPasswordErrorClass !== 'error-active') {
            storeData.repeatPasswordErrorClass = 'error-hint';
        }
        if (
            test &&
            (storeData.repeatPasswordErrorClass === 'error-active' ||
                storeData.repeatPasswordErrorClass === 'error-hint')
        ) {
            storeData.repeatPasswordErrorClass = 'error-inactive';
            if (_passwordInput.value) storeData.repeatPasswordPass = true;
        }

        if (
            storeData.repeatPasswordErrorClass === 'error-active' ||
            storeData.repeatPasswordErrorClass === 'error-hint'
        ) {
            storeData.formErrorClass = 'error-inactive';
        }

        SignupStore.set(storeData);
    });

    EventBus.register(EVENTS.SIGNUP_REPEAT_PASSWORD_FOCUSOUT, () => {
        const _passwordInput = document.getElementsByTagName('input')[1];
        const _repeatPasswordInput = document.getElementsByTagName('input')[2];

        const storeData = SignupStore.get();

        if (_repeatPasswordInput.value.length !== 0) {
            const test = _passwordInput.value === _repeatPasswordInput.value;
            if (test) {
                storeData.repeatPasswordFieldClass = 'form__field-valid';
                storeData.repeatPasswordErrorClass = 'error-inactive';
            } else {
                storeData.repeatPasswordFieldClass = 'form__field-invalid';
                storeData.repeatPasswordErrorClass = 'error-active';
            }
        }

        SignupStore.set(storeData);
    });
};
