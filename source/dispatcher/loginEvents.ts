import EventBus from './eventBus.js';
import { emailRegExp, passwordRegExp } from '../constants/validation.js';
import { HTTPNotFound, HTTPSuccess } from '../constants/HTTPStatus.js';
import { loginRequest } from '../requests/sessionRequest.js';
import { LoginStore } from '../store/loginStore.js';

export const LoginEventRegister = () => {
    EventBus.register('login:button-white', (payload?: string) => {
        const _emailInput = document.getElementsByTagName('input')[0];
        const _passwordInput = document.getElementsByTagName('input')[1];

        const testEmail = emailRegExp.test(_emailInput.value);
        const testPassword = passwordRegExp.test(_passwordInput.value);

        const storeData = LoginStore.get();
        storeData.apiErrorLoadCondition = false;
        LoginStore.set(storeData);

        if (!testEmail) {
            storeData.emailFieldClass = 'form__field-invalid';
            storeData.emailErrorClass = 'error-active';
            LoginStore.set(storeData);
        }
        if (!testPassword) {
            storeData.passwordFieldClass = 'form__field-invalid';
            storeData.passwordErrorClass = 'error-active';
            LoginStore.set(storeData);
        }
        if (!testEmail || !testPassword) {
            return;
        }

        storeData.emailFieldClass = 'form__field-valid';
        storeData.emailErrorClass = 'error-inactive';
        storeData.passwordFieldClass = 'form__field-valid';
        storeData.passwordErrorClass = 'error-inactive';
        LoginStore.set(storeData);

        const _email = _emailInput.value.trim();
        const _password = _passwordInput.value.trim();

        loginRequest(_email, _password)
            .then((response) => {
                if (response.status === HTTPSuccess) {
                    if (response.data.status === HTTPSuccess) {
                        EventBus.dispatch<string>('user:cookie-requests');
                    } else if (response.data.status === HTTPNotFound) {
                        storeData.formErrorClass = 'error-active';
                        LoginStore.set(storeData);
                    }
                } else {
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
        storeData.apiErrorLoadCondition = false;
        LoginStore.set(storeData);
        if (!_emailInput) {
            console.log('Error, trying to read _emailInput on wrong view');
            return;
        }
        const test = _emailInput.value.length === 0 || emailRegExp.test(_emailInput.value);

        test ? (storeData.emailFieldClass = 'form__field-valid') : (storeData.emailFieldClass = 'form__field-invalid');
        if (!test && storeData.emailErrorClass !== 'error-active') {
            console.log('4');
            storeData.emailErrorClass = 'error-hint';
        }
        if (test && (storeData.emailErrorClass === 'error-active' || storeData.emailErrorClass === 'error-hint')) {
            console.log('3');
            storeData.emailErrorClass = 'error-inactive';
        }

        if (storeData.emailErrorClass === 'error-active' || storeData.emailErrorClass === 'error-hint') {
            console.log('2');
            storeData.formErrorClass = 'error-inactive';
        }

        LoginStore.set(storeData);
    });

    EventBus.register('login:email-focusout', (payload?: string) => {
        const _emailInput = document.getElementsByTagName('input')[0];

        const storeData = LoginStore.get();
        storeData.apiErrorLoadCondition = false;
        LoginStore.set(storeData);

        const test = _emailInput.value.length === 0 || emailRegExp.test(_emailInput.value);
        if (test) {
            storeData.emailFieldClass = 'form__field-valid';
            storeData.emailErrorClass = 'error-inactive';
        } else {
            storeData.emailFieldClass = 'form__field-invalid';
            storeData.emailErrorClass = 'error-active';
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
        storeData.apiErrorLoadCondition = false;
        LoginStore.set(storeData);

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

        LoginStore.set(storeData);
    });

    EventBus.register('login:password-focusout', (payload?: string) => {
        const _passwordInput = document.getElementsByTagName('input')[1];

        const storeData = LoginStore.get();
        storeData.apiErrorLoadCondition = false;
        LoginStore.set(storeData);

        const test = _passwordInput.value.length === 0 || passwordRegExp.test(_passwordInput.value);
        if (test) {
            storeData.passwordFieldClass = 'form__field-valid';
            storeData.passwordErrorClass = 'error-inactive';
        } else {
            storeData.passwordFieldClass = 'form__field-invalid';
            storeData.passwordErrorClass = 'error-active';
        }

        LoginStore.set(storeData);
    });
};
