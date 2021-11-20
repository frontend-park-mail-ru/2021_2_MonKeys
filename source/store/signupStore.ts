import BaseStore from './storeBase.js';

export interface SignupData {
    emailFieldClass: string;
    emailErrorClass: string;
    passwordFieldClass: string;
    emailPass?: boolean;
    passwordPass?: boolean;
    repeatPasswordPass?: boolean;
    passwordErrorClass: string;
    repeatPasswordFieldClass: string;
    repeatPasswordErrorClass: string;
    formErrorClass: string;
    apiErrorLoadCondition: boolean;
}

const SignupStore = new BaseStore<SignupData>();

const initData = {
    emailFieldClass: 'form__field-valid',
    emailErrorClass: 'error-inactive',
    passwordFieldClass: 'form__field-valid',
    passwordErrorClass: 'error-inactive',
    repeatPasswordFieldClass: 'form__field-valid',
    repeatPasswordErrorClass: 'error-inactive',
    formErrorClass: 'error-inactive',
    apiErrorLoadCondition: false,
};

SignupStore.set(initData);

export { SignupStore };
