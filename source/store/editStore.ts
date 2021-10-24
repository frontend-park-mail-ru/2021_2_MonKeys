import BaseStore from './storeBase.js';

export interface EditData {
    nameFieldClass: string;
    birthDateFieldClass: string;
    addImgFieldClass?: string;
    tags?: Array<string>;
}

const EditStore = new BaseStore<EditData>();

const initData = {
  nameFieldClass: 'form-field text-without-icon',
  birthDateFieldClass: 'form-field text-with-icon',
  addImgFieldClass: '', // TODO
};

EditStore.set(initData);

export { EditStore };
