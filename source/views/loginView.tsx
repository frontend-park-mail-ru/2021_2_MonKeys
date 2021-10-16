import ViewBase from "./viewBase.js";
import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";
import { FormField } from "../components/formField.js";
import { Button } from "../components/button.js";
import { Link } from "../components/link.js";
import { ErrorMsg } from "../components/errorMsg.js";
import { errorEmailMsg, errorPasswordMsg, errorLoginFormMsg } from "../constants/errorMsg.js";


export default class LoginView extends ViewBase {
    _data = {
        'fields': {
            'email': {
                tag: 'input',
                type: 'email',
                placeholder: 'Почта',
                name: 'email',
                iconSrc: 'icons/email.svg',
                class: 'form-field-valid',
            },
            'password': {
                tag: 'input',
                type: 'password',
                placeholder: 'Пароль',
                name: 'password',
                iconSrc: 'icons/password.svg',
                class: 'form-field-valid',
            },
        },
        'buttons': {
            'loginButton': {
                type: 'submit',
                text: 'Войти',
                class: 'login',
            },
        },
        'links': {
            'signup': {
                text: 'Зарегистрироваться',
                class: 'signup-link',
                dataSection: 'signup',
            },
        },
        'errorMsgs': {
            'emailError': {
                text: errorEmailMsg,
                isVisiable: false,
            },
            'passwordError': {
                text: errorPasswordMsg,
                isVisiable: false,
            },
            'formError': {
                text: errorLoginFormMsg,
                isVisiable: false,
            },
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
                    {ErrorMsg(this._data.errorMsgs.emailError)}
                    {FormField(this._data.fields.password)}
                    {ErrorMsg(this._data.errorMsgs.passwordError)}
                </div>
                {ErrorMsg(this._data.errorMsgs.formError)}
                {Button(this._data.buttons.loginButton)}
            </form>
        </div>
        {Link(this._data.links.signup)}
    </div>
);
}