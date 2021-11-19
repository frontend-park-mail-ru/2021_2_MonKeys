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
    nameFieldClass: 'form__field-valid',
    nameErrorClass: 'error-inactive',
    birthDateFieldClass: 'form__field-valid',
    birthDateErrorClass: 'error-inactive',
    imgFieldClass: 'add-img-box',
    imgErrorClass: 'error-inactive',
    formErrorClass: 'error-inactive',
    apiErrorLoadCondition: false,
};

EditStore.set(initData);

export { EditStore };
