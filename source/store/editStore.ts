import BaseStore from './storeBase.js';

export interface EditData {
    nameFieldClass: string;
    birthDateFieldClass: string;

    formErrorClass: string;

    addImgFieldClass?: string;

    tags?;
}

const EditStore = new BaseStore<EditData>();

const initData = {
    nameFieldClass: 'form-field text-without-icon',
    birthDateFieldClass: 'form-field text-with-icon',
    formErrorClass: 'login-error',
    addImgFieldClass: '', // TODO
};

EditStore.set(initData);

export { EditStore };
