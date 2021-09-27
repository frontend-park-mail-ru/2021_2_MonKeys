

export default class LoginComponent {
    #parent
    #data

    #createInput(type, text, name) {
      const input = document.createElement('input');
      input.type = type;
      input.name = name;
      input.placeholder = text;
      // input.classList.add('form-field');

      return input;
    }
    #createCenterContainer() {
      const divContainer = document.createElement('div');
      divContainer.classList.add('center-container');

      return divContainer;
    }


    #createElementWithClass(tag, className) {
      const element = document.createElement(tag);
      element.className = className;
      return element;
    }
    constructor(parent) {
      this.#parent = parent;
    }

    set data(data) {
      this.#data = data;
    }

    #renderDOM() {
      root.innerHTML = '';

      // --------------------------------------------------------

      // --------------------------------------------------------

      const header = this.#createCenterContainer();

      const headerText = document.createElement('span');
      headerText.textContent = 'Войти';
      headerText.classList.add('login-header');

      header.appendChild(headerText);
      root.appendChild(header);

      const form = document.createElement('form');
      form.classList.add('login-form');
      const errorField = this.#createElementWithClass('div', 'login-error');
      errorField.innerHTML = 'error placeholder';
      const emailInput = this.#createInput('email', 'Почта', 'email');
      emailInput.className = 'form-field-valid';
      emailInput.addEventListener('input', () => {
        const test = emailInput.value.length === 0 || emailRegExp.test(emailInput.value);
        if (test) {
          emailInput.className = 'form-field-valid';
        } else {
          emailInput.className = 'form-field-novalid';
        }
      });

      const passwordInput = this.#createInput('password', 'Пароль', 'password');
      passwordInput.addEventListener('input', () => {
        const test = passwordInput.value.length === 0 || passwordRegExp.test(passwordInput.value);

        if (test) {
          passwordInput.className = 'form-field-valid';
        } else {
          passwordInput.className = 'form-field-novalid';
        }
      });
      passwordInput.className = 'form-field-valid';
      window.addEventListener('load', () => {
        const testEmail = emailInput.value.length === 0 || emailRegExp.test(emailInput.value);
        emailInput.className = testEmail ? 'form-field-valid' : 'form-field-novalid';
        const testPassword = passwordInput.value.length === 0 || passwordRegExp.test(passwordInput.value);
        passwordInput.className = testPassword ? 'form-field-valid' : 'form-field-novalid';
      });

      // кнопка войти
      const submitButton = document.createElement('button');
      submitButton.type = 'submit';
      submitButton.classList.add('login-button');

      const buttonFilling = this.#createCenterContainer();
      const buttonText = document.createElement('span');
      buttonText.textContent = 'Войти';
      buttonText.classList.add('login-button-text');
      const buttonIcon = document.createElement('img');
      buttonIcon.src = './svg/next.svg';
      buttonIcon.classList.add('svg-next');

      buttonFilling.appendChild(buttonText);
      buttonFilling.appendChild(buttonIcon);

      submitButton.appendChild(buttonFilling);

      const emailIcon = document.createElement('img');
      emailIcon.src = './svg/email.svg';
      emailIcon.classList.add('input-icon');
      const passwordIcon = document.createElement('img');
      passwordIcon.src = './svg/password.svg';
      passwordIcon.classList.add('input-icon');

      const emailFieldWithIcon = document.createElement('div');
      emailFieldWithIcon.classList.add('input-with-icon');
      const passwordFieldWithIcon = document.createElement('div');
      passwordFieldWithIcon.classList.add('input-with-icon');

      const logoBg = document.createElement('div');
      logoBg.classList.add('drip-logo-bg');

      const formContainer = this.#createCenterContainer();


      emailFieldWithIcon.appendChild(emailInput);
      emailFieldWithIcon.appendChild(emailIcon);
      passwordFieldWithIcon.appendChild(passwordInput);
      passwordFieldWithIcon.appendChild(passwordIcon);

      logoBg.appendChild(errorField);
      logoBg.appendChild(emailFieldWithIcon);
      logoBg.appendChild(passwordFieldWithIcon);

      form.appendChild(logoBg);
      form.appendChild(submitButton);

      formContainer.appendChild(form);

      const regLinkContainer = this.#createCenterContainer();
      const regLink = document.createElement('a');
      regLink.classList.add('reg-link');
      regLink.href = '/signup';
      regLink.textContent = 'Зарегестрироваться';
      regLink.dataset.section = 'signup';
      regLinkContainer.appendChild(regLink);

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const testEmail = emailRegExp.test(emailInput.value);
        const testPassword = passwordRegExp.test(passwordInput.value);

        if (!testEmail) {
          emailInput.className = 'form-field-novalid';
        }

        if (!testPassword) {
          passwordInput.className = 'form-field-novalid';
        }
        if (!testEmail || !testPassword) {
          return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // /!!!!!!!!!!!!!!!!!!!!!!!!!


        window.User.loginWithCredentials(email, password, ()=> {
          window.location.reload();
        });


        // /!!!!!!!!!!!!!!!!!!!!!!!
      });

      root.appendChild(formContainer);
      root.appendChild(regLinkContainer);
    }

    render() {
      this.#renderDOM();
    }
}
