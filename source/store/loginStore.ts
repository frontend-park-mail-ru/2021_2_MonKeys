import BaseStore from './storeBase.js';

export interface LoginData {
    emailFieldClass: string;
    emailErrorClass: string;
    passwordFieldClass: string;
    passwordErrorClass: string;
    formErrorClass: string;
    emailPass?: boolean;
    passwordPass?: boolean;
}

const LoginStore = new BaseStore<LoginData>();

const initData = {
    emailFieldClass: 'form__field-valid',
    emailErrorClass: 'error-hidden',
    emailPass: false,
    passwordFieldClass: 'form__field-valid',
    passwordErrorClass: 'error-hidden',
    passwordPass: false,
    formErrorClass: 'error-hidden',
};

LoginStore.set(initData);

export { LoginStore };
