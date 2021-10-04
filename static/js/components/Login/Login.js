// eslint-disable-next-line no-unused-vars
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// eslint-disable-next-line no-unused-vars
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

// eslint-disable-next-line no-unused-vars
const errorEmailMsg = 'Введите почту в формате example@drip.com';
// eslint-disable-next-line no-unused-vars
const errorPasswordMsg = 'Пароль должен состоять из больших и маленьких латинских символов (не менее 8 символов)';
// eslint-disable-next-line no-unused-vars
const errorForm = 'Такой пользователь еще не зарегистрирован';

export default class LoginComponent {
    _parent
    _emailInput
    _passwordInput
    _errorPassword
    _errorEmail
    _errorForm
    _form

    checkEmailInput() {
      this._emailInput.addEventListener('input', () => {
        const test = this._emailInput.value.length === 0 || emailRegExp.test(this._emailInput.value);
            (test) ? this._emailInput.className = 'form-field-valid':
                this._emailInput.className = 'form-field-novalid';
      });
      this._emailInput.addEventListener('focusout', () => {
        const test = this._emailInput.value.length === 0 || emailRegExp.test(this._emailInput.value);
        if (test) {
          this._emailInput.className = 'form-field-valid';
          this._errorEmail.innerText = '';
        } else {
          this._emailInput.className = 'form-field-novalid';
          this._errorEmail.className = 'login-error-active';
          this._errorEmail.innerText = errorEmailMsg;
        }
      });
    }

    checkPasswordInput() {
      this._passwordInput.addEventListener('input', () => {
        const test = this._passwordInput.value.length === 0 || passwordRegExp.test(this._passwordInput.value);
            (test) ? this._passwordInput.className = 'form-field-valid':
                this._passwordInput.className = 'form-field-novalid';
      });
      this._passwordInput.addEventListener('focusout', () => {
        const test = this._passwordInput.value.length === 0 || passwordRegExp.test(this._passwordInput.value);
        if (test) {
          this._passwordInput.className = 'form-field-valid';
          this._errorPassword.textContent = '';
        } else {
          this._passwordInput.className = 'form-field-novalid';
          this._errorPassword.className = 'login-error-active';
          this._errorPassword.textContent = errorPasswordMsg;
        }
      });
    }

    checkSubmit(callback) {
      this._form.addEventListener('submit', (e) => {
        e.preventDefault();
        const testEmail = emailRegExp.test(this._emailInput.value);
        const testPassword = passwordRegExp.test(this._passwordInput.value);
        if (!testEmail) {
          this._errorEmail.className = 'login-error-active';
          this._errorEmail.textContent = errorEmailMsg;
          this._emailInput.className = 'form-field-novalid';
        }
        if (!testPassword) {
          this._errorPassword.className = 'login-error-active';
          this._errorPassword.textContent = errorPasswordMsg;
          this._emailInput.className = 'form-field-novalid';
        }
        if (!testEmail || !testPassword) {
          return;
        }
        this._errorEmail.className = 'login-error';
        this._errorEmail.textContent = '';
        this._errorPassword.className = 'login-error';
        this._errorPassword.textContent = '';
        const email = this._emailInput.value.trim();
        const password = this._passwordInput.value.trim();

        // callback(email, password);
        this._loginUserWithCredentials(email, password, callback);
      });
    }

    _loginUserWithCredentials(email, password, callback) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'email': email,
          'password': password,
        }),
        credentials: 'include',
      };
      fetch(`${serverAddress}${authURL}`, requestOptions)
          .then((response) =>
            response.json().then((data) => ({
              data: data,
              status: response.status,
            })).then((res) => {
              if (res.status === 200 && res.data.status === 200) {
                callback(email, password);
                // this.loginWithCookie(callback);
              } else if (res.data.status === 404) {
                this._errorForm.className = 'login-error-active';
                this._errorForm.textContent = errorForm;
              }
            })).catch((error) => console.log(error));
    }

    constructor(parent) {
      this._parent = parent;
    }


    _getElems() {
      this._form = document.getElementsByClassName('login-form')[0];
      this._emailInput = document.getElementsByTagName('input')[0];
      this._passwordInput = document.getElementsByTagName('input')[1];
      this._errorEmail = document.getElementsByClassName('login-error')[0];
      this._errorPassword = document.getElementsByClassName('login-error')[1];
      this._errorForm = document.getElementsByClassName('login-error')[2];
    }

    _renderDOM() {
      this._parent.innerHTML = '';
      const renderedHTML = Handlebars.templates['login'];
      this._parent.innerHTML = renderedHTML();
      this._getElems();
    }
    _createElementWithClass(tag, className) {
      const element = document.createElement(tag);
      element.className = className;
      return element;
    }
    render() {
      this._renderDOM();
    }
}
