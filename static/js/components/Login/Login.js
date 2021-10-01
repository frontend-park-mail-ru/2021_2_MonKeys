// eslint-disable-next-line no-unused-vars
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// eslint-disable-next-line no-unused-vars
const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export default class LoginComponent {
    _parent
    _emailInput
    _passwordInput
    _errorPassword
    _errorEmail
    _form

    checkEmailInput() {
     
      this._emailInput.addEventListener('input', () => {
        const test = this._emailInput.value.length === 0 || emailRegExp.test(this._emailInput.value);
        (test) ? this._emailInput.className = 'form-field-valid'
           :  this._emailInput.className = 'form-field-novalid';
      });
      this._emailInput.addEventListener('focusout', () => {
        const test = this._emailInput.value.length === 0 || emailRegExp.test(this._emailInput.value);
        if (test) {
          this._emailInput.className = 'form-field-valid';
        } else {
          this._emailInput.className = 'form-field-novalid';
          this._errorEmail.className = 'login-error-active';
        }
      });
    }
    checkPasswordInput() {
      this._passwordInput.addEventListener('input', () => {
        const test = this._passwordInput.value.length === 0 || passwordRegExp.test(this._passwordInput.value);
        (test) ? this._passwordInput.className = 'form-field-valid' 
               : this._passwordInput.className = 'form-field-novalid';
      });
      this._passwordInput.addEventListener('focusout', () => {
        const test = this._passwordInput.value.length === 0 || passwordRegExp.test(this._passwordInput.value);
        if (test) {
          this._passwordInput.className = 'form-field-valid';
        } else {
          this._passwordInput.className = 'form-field-novalid';
          this._errorPassword.className = 'login-error-active';
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
          this._emailInput.className = 'form-field-novalid';
        }
        if (!testPassword) {
          this._errorPassword.className = 'login-error-active';
          this._emailInput.className = 'form-field-novalid';
        }
        if (!testEmail || !testPassword) {
          return;
        }
        this._errorEmail.className = 'login-error';
        this._errorPassword.className = 'login-error';
        const email = this._emailInput.value.trim();
        const password = this._emailInput.value.trim();
   
        callback(email,password);
      });
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
    }

    _renderDOM() {
      this._parent.innerHTML = '';
      const renderedHTML = Handlebars.templates['Login']();
      this._parent.innerHTML = renderedHTML
      this._getElems()
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
