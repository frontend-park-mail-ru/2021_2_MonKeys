
import ViewBase from "./viewBase";
import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM";
import { FormField } from "components/formField";
import { Button } from "components/button";

export default class LoginView extends ViewBase {
    _data = {
        'fields': {
            'email': {
                placeholder: 'Почта',
                type: 'email',
                name: 'email',
                iconSrc: 'icons/email.svg',
                isValid: true,
            },
            'password': {
                placeholder: 'Пароль',
                type: 'password',
                name: 'password',
                iconSrc: 'icons/password.svg',
                isValid: true,
            }
        },
        'buttons': {
            'loginButton': {
                type: 'submit',
                text: 'Войти',
            },
            'signupButton': {
                type: 'button',
                text: 'Зарегистрироваться',
            }
        }
    }
    _template = (
    <div class="form-container">
        <div class="center-container">
            <span class="login-header">Войти</span>
        </div>
        <div class="center-container">
            <form class="login-form">
                <div class="drip-logo-bg">
                    {FormField(this._data.fields.email)}
                    <div class="login-error"></div>
                    {FormField(this._data.fields.password)}
                    <div class="login-error"></div>
                </div>
                <div class="login-error"></div>
                {Button(this._data.buttons.loginButton)}
            </form>
        </div>
        <div class="center-container">
                {Button(this._data.buttons.signupButton)}
        </div>
    </div>
);
}