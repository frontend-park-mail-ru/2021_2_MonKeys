import LoginView from "views/loginView.js";
import BaseStore from "./storeBase.js";

export interface EditData {
    nameFieldClass: string;
    birthDateFieldClass: string;
    tags?: Array<string>;
}

const EditStore = new BaseStore<EditData>();

const initData = {
    nameFieldClass: 'form-field text-without-icon',
    birthDateFieldClass: 'form-field text-with-icon',
}

EditStore.set(initData);

export { EditStore };
