import BaseStore from "./storeBase.js";

export interface EditData {
    nameFieldClass: string;
    birthDateFieldClass: string;
    formErrorClass: string;
    tags?: any;
}

const EditStore = new BaseStore<EditData>();

const initData = {
    nameFieldClass: 'form-field text-without-icon',
    birthDateFieldClass: 'form-field text-with-icon',
    formErrorClass: 'login-error',
}

EditStore.set(initData);

export { EditStore };
