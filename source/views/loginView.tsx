import ViewBase from "./viewBase.js";
import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";
import { FormField } from "../components/formField.js";
import { Button } from "../components/button.js";
import { Link } from "../components/link.js";
import { ErrorMsg } from "../components/errorMsg.js";
import { errorEmailMsg, errorPasswordMsg, errorLoginFormMsg } from "../constants/errorMsg.js";
import EventBus from "../dispatcher/eventBus.js"
import { LoginStore } from "../store/loginStore.js";


export default class LoginView extends ViewBase {
  constructor(parent: HTMLElement) {
    super(parent);
    LoginStore.subscribe((data) => {
      this._data.fields.email.class = data.emailFieldClass;
      this._data.fields.password.class = data.passwordFieldClass;
      this._data.errorMsgs.emailError.class = data.emailErrorClass;
      this._data.errorMsgs.passwordError.class = data.passwordErrorClass;
      this._data.errorMsgs.formError.class = data.formErrorClass;
      this._template = this._createTmpl(this._data);
      this.render();
    })
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
        oninput: () => { EventBus.dispatch<string>('login:email-input'); },
        onfocusout: () => { EventBus.dispatch<string>('login:email-focusout'); },
      },
      'password': {
        tag: 'input',
        type: 'password',
        placeholder: 'Пароль',
        name: 'password',
        iconSrc: 'icons/password.svg',
        class: LoginStore.get().passwordFieldClass,
        oninput: () => { EventBus.dispatch<string>('login:password-input'); },
        onfocusout: () => { EventBus.dispatch<string>('login:password-focusout'); },
      },
    },
    'buttons': {
      'loginButton': {
        type: 'button',
        text: 'Войти',
        class: 'login',
        onclick: () => { EventBus.dispatch<string>('login:login-button'); },
      },
    },
    'links': {
      'signup': {
        text: 'Зарегистрироваться',
        class: 'signup-link',
        dataSection: 'signup',
        route: '/signup'
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
    }
  };

  _createTmpl(data: any) {
    return (
      <div class="form-container">
        <div class="center-container">
          <span class="login-header">Войти</span>
        </div>
        <div class="center-container">
          <form class="login-form">
            <div class="drip-logo-bg">
              {FormField(data.fields.email)}
              {ErrorMsg(data.errorMsgs.emailError)}
              {FormField(data.fields.password)}
              {ErrorMsg(data.errorMsgs.passwordError)}
            </div>
            {ErrorMsg(data.errorMsgs.formError)}
            {Button(data.buttons.loginButton)}
          </form>
        </div>
        {Link(data.links.signup)}
      </div>
    );
  }
}
