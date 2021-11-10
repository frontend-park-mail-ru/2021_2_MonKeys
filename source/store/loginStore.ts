import BaseStore from './storeBase.js';

export interface LoginData {
    emailFieldClass: string;
    emailErrorClass: string;
    passwordFieldClass: string;
    passwordErrorClass: string;
    formErrorClass: string;
    apiErrorLoadCondition: boolean;
}

const LoginStore = new BaseStore<LoginData>();

const initData = {
    emailFieldClass: 'form-field-valid',
    emailErrorClass: 'login-error',
    passwordFieldClass: 'form-field-valid',
    passwordErrorClass: 'login-error',
    formErrorClass: 'login-error',
    apiErrorLoadCondition: false,
};

LoginStore.set(initData);

export { LoginStore };
