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
    emailFieldClass: 'form__field-valid',
    emailErrorClass: 'error-inactive',
    passwordFieldClass: 'form__field-valid',
    passwordErrorClass: 'error-inactive',
    formErrorClass: 'error-inactive',
    apiErrorLoadCondition: false,
};

LoginStore.set(initData);

export { LoginStore };
