import EventBus from "./eventBus.js"
import { emailRegExp, passwordRegExp } from "../constants/validation.js";
import { HTTPNotFound, HTTPSuccess } from "../constants/HTTPStatus.js";
import { ProfileStore } from "../store/profileStore.js";
import router from '../route/router.js';
import { loginRequest } from "../requests/sessionRequest.js";
import { feedRequest } from "../requests/feedRequest.js";

export const loginEventRegister = () => {
    EventBus.register('login:login-button', (payload?: string) => {
        // ТОТАЛЬНЕЙШИЙ КРИНЖ ЭТО ДОЛЖНО БЫТЬ ЧЕРЕЗ ВИРТУАЛДОМ ПОТОМ 
        // НО ПОКА ТАК ААААААААААААААА
        // ПОЛНЫЙ КРИНЖ АААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААААА
        const _emailInput = document.getElementsByTagName('input')[0];
        const _passwordInput = document.getElementsByTagName('input')[1];
        const _emailError = document.getElementsByName('error')[0];
        const _passwordError = document.getElementsByName('error')[1];
        const _formError = document.getElementsByName('error')[2];

        const testEmail = emailRegExp.test(_emailInput.value);
        const testPassword = passwordRegExp.test(_passwordInput.value);
        if (!testEmail) {
        _emailInput.className = 'form-field-novalid';
        _emailError.className = 'login-error-active';
        }
        if (!testPassword) {
        _passwordInput.className = 'form-field-novalid';
        _passwordError.className = 'login-error-active';
        }
        if (!testEmail || !testPassword) {
        return;
        }
        _emailError.className = 'login-error';
        _passwordError.className = 'login-error';

        const _email = _emailInput.value.trim();
        const _password = _passwordInput.value.trim();

        //запрос
        loginRequest(_email, _password)
            .then(
                (response)=> {
                    if (response.status === HTTPSuccess) {
                        if (response.data.status === HTTPSuccess) {
                            ProfileStore.set(response.data.body);
                            feedRequest()
                                .then(
                                    (feedResponse)=> {
                                        console.log(1);
                                        console.log(feedResponse);
                                        router.go('/feed');
                                    }
                                )
                        } else if (response.data.status === HTTPNotFound) {
                            _formError.className = 'login-error-active';
                        }
                    } else {
                        // server internal error
                        console.log('server internal error');
                    }
                }
            ).catch((error) => console.log(error));
    });

    EventBus.register('login:email-input', (payload?: string) => {
        const _emailInput = document.getElementsByTagName('input')[0];

        const test = _emailInput.value.length === 0 || emailRegExp.test(_emailInput.value);
            (test)
                ? _emailInput.className = 'form-field-valid'
                : _emailInput.className = 'form-field-novalid';
    });

    EventBus.register('login:email-focusout', (payload?: string) => {
        const _emailInput = document.getElementsByTagName('input')[0];
        const _emailError = document.getElementsByName('error')[0];

        const test = _emailInput.value.length === 0 || emailRegExp.test(_emailInput.value);
            if (test) {
            _emailInput.className = 'form-field-valid';
            _emailError.className = 'login-error';
            } else {
            _emailInput.className = 'form-field-novalid';
            _emailError.className = 'login-error-active';
            }
    });

    EventBus.register('login:password-input', (payload?: string) => {
        const _passwordInput = document.getElementsByTagName('input')[1];

        const test = _passwordInput.value.length === 0 || passwordRegExp.test(_passwordInput.value);
            (test)
                ? _passwordInput.className = 'form-field-valid'
                : _passwordInput.className = 'form-field-novalid';
    });

    EventBus.register('login:password-focusout', (payload?: string) => {
        const _passwordInput = document.getElementsByTagName('input')[1];
        const _passwordError = document.getElementsByName('error')[1];

        const test = _passwordInput.value.length === 0 || passwordRegExp.test(_passwordInput.value);
            if (test) {
            _passwordInput.className = 'form-field-valid';
            _passwordError.className = 'login-error';
            } else {
            _passwordInput.className = 'form-field-novalid';
            _passwordError.className = 'login-error-active';
            }
    });
}
