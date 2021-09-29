export default class LoginComponent {
    _parent
    _data

    _createInput(type, text, name) {
        const input = document.createElement('input');
        input.type = type;
        input.name = name;
        input.placeholder = text;
        // input.classList.add('form-field');

        return input;
    }
    _createCenterContainer() {
        const divContainer = document.createElement('div');
        divContainer.classList.add('center-container');

        return divContainer;
    }


    _createElementWithClass(tag, className) {
        const element = document.createElement(tag);
        element.className = className;
        return element;
    }
    constructor(parent) {
        this._parent = parent;
    }

    set data(data) {
        this._data = data;
    }

    _renderDOM() {
        root.innerHTML = '';

        // --------------------------------------------------------

        // --------------------------------------------------------

        const header = this._createCenterContainer();

        const headerText = document.createElement('span');
        headerText.textContent = 'Войти';
        headerText.classList.add('login-header');

        header.appendChild(headerText);
        root.appendChild(header);

        const form = document.createElement('form');
        form.classList.add('login-form');
        const emailInput = this._createInput('email', 'Почта', 'email');
        emailInput.className = 'form-field-valid';
        emailInput.addEventListener('input', () => {
            const test = emailInput.value.length === 0 || emailRegExp.test(emailInput.value);
            if (test) {
                emailInput.className = 'form-field-valid';
            } else {
                emailInput.className = 'form-field-novalid';
            }
        });

        const passwordInput = this._createInput('password', 'Пароль', 'password');
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

        const buttonFilling = this._createCenterContainer();
        const buttonText = document.createElement('span');
        buttonText.textContent = 'Войти';
        buttonText.classList.add('login-button-text');
        const buttonIcon = document.createElement('img');
        // buttonIcon.src = 'icons/next.svg';
        // buttonIcon.classList.add('svg-next');

        buttonFilling.appendChild(buttonText);
        buttonFilling.appendChild(buttonIcon);

        submitButton.appendChild(buttonFilling);

        const emailIcon = document.createElement('img');
        emailIcon.src = 'icons/email.svg';
        emailIcon.classList.add('input-icon');
        const passwordIcon = document.createElement('img');
        passwordIcon.src = 'icons/password.svg';
        passwordIcon.classList.add('input-icon');

        const emailFieldWithIcon = document.createElement('div');
        emailFieldWithIcon.classList.add('input-with-icon');
        const passwordFieldWithIcon = document.createElement('div');
        passwordFieldWithIcon.classList.add('input-with-icon');

        const logoBg = document.createElement('div');
        logoBg.classList.add('drip-logo-bg');

        const formContainer = this._createCenterContainer();

        const errorEmail = this._createElementWithClass('div', 'login-error');
        errorEmail.innerHTML = 'Введите пароль в формате example@drip.com';
        const errorPassword = this._createElementWithClass('div', 'login-error');
        errorPassword.innerHTML = 'Пароль должен состоять из больших, маленьких латинских символов, цифр и спец символа';

        emailFieldWithIcon.appendChild(emailInput);
        emailFieldWithIcon.appendChild(emailIcon);
        passwordFieldWithIcon.appendChild(passwordInput);
        passwordFieldWithIcon.appendChild(passwordIcon);

        logoBg.appendChild(emailFieldWithIcon);
        logoBg.appendChild(errorEmail);
        logoBg.appendChild(passwordFieldWithIcon);
        logoBg.appendChild(errorPassword);

        const errorField = this._createElementWithClass('div', 'login-error');
        errorField.innerHTML = 'Вы еще не зарегистрированы';

        form.appendChild(logoBg);
        form.appendChild(errorField);
        form.appendChild(submitButton);

        formContainer.appendChild(form);

        const regLinkContainer = this._createCenterContainer();
        const regLink = document.createElement('a');
        regLink.classList.add('reg-link');
        regLink.href = '/signup';
        regLink.textContent = 'Зарегистрироваться';
        regLink.dataset.section = 'signup';
        regLinkContainer.appendChild(regLink);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const testEmail = emailRegExp.test(emailInput.value);
            const testPassword = passwordRegExp.test(passwordInput.value);

            if (!testEmail) {
                errorEmail.className = 'login-error-active';
                emailInput.className = 'form-field-novalid';
            }

            if (!testPassword) {
                errorPassword.className = 'login-error-active';
                passwordInput.className = 'form-field-novalid';
            }

            if (!testEmail || !testPassword) {
                return;
            }

            errorEmail.className = 'login-error';
            errorPassword.className = 'login-error';

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // /!!!!!!!!!!!!!!!!!!!!!!!!!

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'email': email,
                    'password': password,
                }),
                credentials: 'include',
            };
            fetch(`${serverAddress}/api/v1/login`, requestOptions)
                .then((response) =>
                    response.json().then((data) => ({
                        data: data,
                        status: response.status,
                    })).then((res) => {
                        if (res.status === 200 && res.data.status === 200) {
                            errorField.className = 'login-error';
                            window.User.loginWithCookie(() => {
                                window.location.reload();
                            });
                        } else if (res.data.status === 404) {
                            errorField.className = 'login-error-active';
                            // loginPageError("User not found")
                        }
                    })).catch((error) => console.log(error));

            // window.User.loginWithCredentials(email, password, ()=> {
            //   window.location.reload();
            // });


            // /!!!!!!!!!!!!!!!!!!!!!!!
        });

        root.appendChild(formContainer);
        root.appendChild(regLinkContainer);
    }

    render() {
        this._renderDOM();
    }
}