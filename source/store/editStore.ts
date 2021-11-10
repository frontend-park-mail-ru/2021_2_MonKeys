import BaseStore from './storeBase.js';

export interface EditData {
    nameFieldClass: string;
    nameErrorClass: string;
    birthDateFieldClass: string;
    birthDateErrorClass: string;
    formErrorClass: string;
    imgFieldClass: string;
    imgErrorClass: string;
    apiErrorLoadCondition: boolean;
    tags?;
}

const EditStore = new BaseStore<EditData>();

const initData = {
    nameFieldClass: 'form-field-edit text-without-icon',
    nameErrorClass: 'login-error',
    birthDateFieldClass: 'form-field-edit text-with-icon',
    birthDateErrorClass: 'login-error',
    imgFieldClass: 'add-img-box',
    imgErrorClass: 'login-error',
    formErrorClass: 'login-error',
    apiErrorLoadCondition: false,
};

EditStore.set(initData);

export { EditStore };
