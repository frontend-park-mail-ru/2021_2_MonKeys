import BaseStore from './storeBase.js';

export interface EditData {
    nameFieldClass: string;
    birthDateFieldClass: string;
    formErrorClass: string;
    imgFieldClass: string;
    apiErrorLoadCondition: boolean;
    tags?;
}

const EditStore = new BaseStore<EditData>();

const initData = {
    nameFieldClass: 'form-field-edit text-without-icon',
    birthDateFieldClass: 'form-field-edit text-with-icon',
    imgFieldClass: 'add-img-box',
    formErrorClass: 'login-error',
    apiErrorLoadCondition: false,
};

EditStore.set(initData);

export { EditStore };
