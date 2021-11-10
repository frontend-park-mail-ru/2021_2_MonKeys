import BaseStore from './storeBase.js';

export interface SignupData {
    emailFieldClass: string;
    emailErrorClass: string;
    passwordFieldClass: string;
    passwordErrorClass: string;
    repeatPasswordFieldClass: string;
    repeatPasswordErrorClass: string;
    formErrorClass: string;
    apiErrorLoadCondition: boolean;
}

const SignupStore = new BaseStore<SignupData>();

const initData = {
    emailFieldClass: 'form-field-valid',
    emailErrorClass: 'login-error',
    passwordFieldClass: 'form-field-valid',
    passwordErrorClass: 'login-error',
    repeatPasswordFieldClass: 'form-field-valid',
    repeatPasswordErrorClass: 'login-error',
    formErrorClass: 'login-error',
    apiErrorLoadCondition: false,
};

SignupStore.set(initData);

export { SignupStore };
