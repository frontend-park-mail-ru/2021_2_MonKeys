import { ItemListProps } from 'components/itemList.js';
import BaseStore from './storeBase.js';

export interface EditData {
    nameFieldClass: string;
    nameErrorClass: string;
    birthDateFieldClass: string;
    birthDateErrorClass: string;
    formErrorClass: string;
    imgFieldClass: string;
    imgErrorClass: string;
    genderField?: ItemListProps;
    preferField?: ItemListProps;
    tagsField?: ItemListProps;
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
    genderField: {
        title: 'Ваш пол',
        valid: true,
        open: true,
        items: [
            {
                value: 'мужчина',
                selected: false,
            },
            {
                value: 'женщина',
                selected: false,
            },
        ],
        buttonEvent: 'edit:gender-click',
    },
    preferField: {
        title: 'Предпочтения',
        valid: true,
        open: true,
        items: [
            {
                value: 'hello',
                selected: false,
            },
            {
                value: 'check',
                selected: false,
            },
            {
                value: 'chsds',
                selected: false,
            },
            {
                value: 'check',
                selected: false,
            },
            {
                value: 'chsds',
                selected: true,
            },
        ],
        buttonEvent: 'edit:tags-click',
    },
    tagsField: {
        title: 'Предпочтения',
        valid: true,
        open: false,
        items: [
            {
                value: 'Мужчины',
                selected: false,
            },
            {
                value: 'Женщины',
                selected: false,
            },
        ],
        buttonEvent: 'edit:prefer-click',
    },
    apiErrorLoadCondition: false,
};

EditStore.set(initData);

export { EditStore };
