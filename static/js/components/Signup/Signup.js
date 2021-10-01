import EditComponent from '../Edit/Edit.js';

export default class SignupComponent {
    _parent
    _data

    constructor(parent) {
        this._parent = parent;
    }

    set data(data) {
        this._data = data;
    }

    _createElementWithClass(tag, className) {
        const element = document.createElement(tag);
        element.className = className;
        return element;
    }

    _renderDOM() {
        function createCenterContainer() {
            const divContainer = document.createElement('div');
            divContainer.classList.add('center-container');

            return divContainer;
        }

        function createInput(type, text, name) {
            const input = document.createElement('input');
            input.type = type;
            input.name = name;
            input.placeholder = text;
            // input.classList.add('form-field');

            return input;
        }
        this._parent.innerHTML = '';
        const container = this._createElementWithClass('div', 'card-container');
        const header = createCenterContainer();

        const headerText = document.createElement('span');
        headerText.textContent = 'Регистрация';
        headerText.classList.add('login-header');

        header.appendChild(headerText);
        container.appendChild(header);

        const form = document.createElement('form');
        form.classList.add('login-form');

        const emailInput = createInput('email', 'Почта', 'email');
        emailInput.className = 'form-field-valid';
        emailInput.addEventListener('input', () => {
            const test = emailInput.value.length === 0 || emailRegExp.test(emailInput.value);
            if (test) {
                emailInput.className = 'form-field-valid';
            } else {
                emailInput.className = 'form-field-novalid';
            }
        });
        const passwordInput = createInput('password', 'Пароль', 'password');
        passwordInput.className = 'form-field-valid';
        passwordInput.addEventListener('input', () => {
            const test = passwordInput.value.length === 0 || passwordRegExp.test(passwordInput.value);

            if (test) {
                passwordInput.className = 'form-field-valid';
            } else {
                passwordInput.className = 'form-field-novalid';
            }
        });

        const repeatPasswordInput = createInput('password', 'Повторите пароль', 'password');
        repeatPasswordInput.className = 'form-field-valid';
        repeatPasswordInput.addEventListener('input', () => {
            const test = passwordInput.value === repeatPasswordInput.value;
            if (test) {
                repeatPasswordInput.className = 'form-field-valid';
            } else {
                repeatPasswordInput.className = 'form-field-novalid';
            }
        });

        // кнопка зарегестрироваться
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.classList.add('signup-button');

        const buttonFilling = createCenterContainer();
        const buttonText = document.createElement('span');
        buttonText.textContent = 'Зарегистрироваться';
        buttonText.classList.add('signup-button-text');
        // const buttonIcon = document.createElement('img');
        // buttonIcon.src = 'icons/next.svg';
        // buttonIcon.classList.add('svg-next');

        buttonFilling.appendChild(buttonText);
        // buttonFilling.appendChild(buttonIcon);

        submitButton.appendChild(buttonFilling);

        const emailIcon = document.createElement('img');
        emailIcon.src = 'icons/email.svg';
        emailIcon.classList.add('input-icon');
        const passwordIcon = document.createElement('img');
        passwordIcon.src = 'icons/password.svg';
        passwordIcon.classList.add('input-icon');
        const repeatPasswordIcon = document.createElement('img');
        repeatPasswordIcon.src = 'icons/password.svg';
        repeatPasswordIcon.classList.add('input-icon');

        const emailFieldWithIcon = document.createElement('div');
        emailFieldWithIcon.classList.add('input-with-icon');
        const passwordFieldWithIcon = document.createElement('div');
        passwordFieldWithIcon.classList.add('input-with-icon');
        const repeatPasswordFieldWithIcon = document.createElement('div');
        repeatPasswordFieldWithIcon.classList.add('input-with-icon');

        const logoBg = document.createElement('div');
        logoBg.classList.add('drip-logo-bg');

        const formContainer = createCenterContainer();

        emailFieldWithIcon.appendChild(emailInput);
        emailFieldWithIcon.appendChild(emailIcon);
        passwordFieldWithIcon.appendChild(passwordInput);
        passwordFieldWithIcon.appendChild(passwordIcon);
        repeatPasswordFieldWithIcon.appendChild(repeatPasswordInput);
        repeatPasswordFieldWithIcon.appendChild(repeatPasswordIcon);

        // error messages
        const errorEmail = this._createElementWithClass('div', 'login-error');
        errorEmail.innerHTML = 'Введите пароль в формате example@drip.com';
        const errorPassword = this._createElementWithClass('div', 'login-error');
        errorPassword.innerHTML = 'Пароль должен состоять из больших, маленьких латинских символов, цифр и спец символа';
        const errorRepeatPassword = this._createElementWithClass('div', 'login-error');
        errorRepeatPassword.innerHTML = 'Пароли не совпадают';

        logoBg.appendChild(emailFieldWithIcon);
        logoBg.appendChild(errorEmail);
        logoBg.appendChild(passwordFieldWithIcon);
        logoBg.appendChild(errorPassword);
        logoBg.appendChild(repeatPasswordFieldWithIcon);
        logoBg.appendChild(errorRepeatPassword);

        // error message for request
        const errorField = this._createElementWithClass('div', 'login-error');
        errorField.innerHTML = 'Пользователь с такой почтой уже зарегистрирован';

        form.appendChild(logoBg);
        form.appendChild(errorField);
        form.appendChild(submitButton);

        formContainer.appendChild(form);

        // button back
        const buttonBack = document.createElement('a');
        buttonBack.classList.add('back-link');
        buttonBack.href = '/login';
        buttonBack.dataset.section = 'login';
        const backSVG = document.createElement('img');
        backSVG.classList.add('back-svg');
        backSVG.src = 'icons/back.svg';
        const textBack = document.createElement('span');
        textBack.classList.add('back-text');
        textBack.textContent = 'вернуться назад';
        const buttonBackFeeling = createCenterContainer();
        buttonBackFeeling.appendChild(backSVG);
        buttonBackFeeling.appendChild(textBack);
        const buttonBackContainer = createCenterContainer();
        buttonBack.appendChild(buttonBackFeeling);
        buttonBackContainer.appendChild(buttonBack);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const testEmail = emailRegExp.test(emailInput.value);
            const testPassword = passwordRegExp.test(passwordInput.value);
            const testPasswordRepeat = passwordInput.value === repeatPasswordInput.value;

            if (!testEmail) {
                errorEmail.className = 'login-error-active';
                emailInput.className = 'form-field-novalid';
            }

            if (!testPassword) {
                errorPassword.className = 'login-error-active';
                passwordInput.className = 'form-field-novalid';
            }

            if (!testPasswordRepeat) {
                errorRepeatPassword.className = 'login-error-active';
                repeatPasswordInput.className = 'form-field-novalid';
            }

            if (!testEmail || !testPassword || !testPasswordRepeat) {
                return;
            }

            errorEmail.className = 'login-error';
            errorPassword.className = 'login-error';
            errorRepeatPassword.className = 'login-error';

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const passwordRepeat = repeatPasswordInput.value.trim();
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'email': email,
                    'password': password,
                    'passwordRepeat': passwordRepeat,
                }),
                credentials: 'include',
            };
            fetch(`${serverAddress}${profileURL}`, requestOptions)
                .then((response) =>
                    response.json().then((data) => ({
                        data: data,
                        status: response.status,
                    })).then((res) => {
                        if (res.status === 200 && res.data.status === 200) {
                            errorField.className = 'login-error';
                            const edit = new EditComponent(this._parent);
                            edit.render();
                            //                 window.User.loginWithCredentials(email, password, ()=> {
                            //          
                            //                 });
                        } else if (res.data.status === 1001) {
                            errorField.className = 'login-error-active';
                        }
                    })).catch((error) => console.log(error));
        });

        container.appendChild(formContainer);
        container.appendChild(buttonBackContainer);
        this._parent.appendChild(container);
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