import ViewBase from "./viewBase.js";
import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";
import { FormField } from "../components/formField.js";
import { Button } from "../components/button.js";
import { Link } from "../components/link.js";
import { ErrorMsg } from "../components/errorMsg.js";
import { errorEmailMsg, errorPasswordMsg, errorRepeatPasswordMsg, errorSignupFormMsg } from "../constants/errorMsg.js";


export default class SignupView extends ViewBase {
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
            'repeatPassword': {
                tag: 'input',
                type: 'password',
                placeholder: 'Повторите пароль',
                name: 'password',
                iconSrc: 'icons/password.svg',
                class: 'form-field-valid',
            },
        },
        'buttons': {
            'signupButton': {
                type: 'submit',
                text: 'Зарегистрироваться',
                class: 'signup',
                onclick: ()=>{},
            },
        },
        'links': {
            'login': {
                text: 'вернуться назад',
                class: 'login-link',
                dataSection: 'login',
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
            'repeatPasswordError': {
                text: errorRepeatPasswordMsg,
                isVisiable: false,
            },
            'formError': {
                text: errorSignupFormMsg,
                isVisiable: false,
            },
        },
    }
    _template = (
    <div class="form-container">
        <div class="center-container">
            <span class="login-header">Регистрация</span>
        </div>
        <div class="center-container">
            <form class="login-form">
                <div class="drip-logo-bg">
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
    </div>
);
}