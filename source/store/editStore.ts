import BaseStore from './storeBase.js';

export interface EditData {
    nameFieldClass: string;
    birthDateFieldClass: string;
    formErrorClass: string;
    addImgFieldClass?: string;
    apiErrorLoadCondition: boolean;
    tags?;
}

const EditStore = new BaseStore<EditData>();

const initData = {
    nameFieldClass: 'form-field-edit text-without-icon',
    birthDateFieldClass: 'form-field-edit text-with-icon',
    formErrorClass: 'login-error',
    apiErrorLoadCondition: false,
    addImgFieldClass: '',
};

EditStore.set(initData);

export { EditStore };
