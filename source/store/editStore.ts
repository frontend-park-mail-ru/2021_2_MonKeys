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
    genderErrorClass?: string;
    preferField?: ItemListProps;
    preferErrorClass?: string;
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
    genderErrorClass: 'error-inactive',
    preferErrorClass: 'error-inactive',
    formErrorClass: 'error-inactive',
    genderField: {
        title: 'Ваш пол',
        valid: true,
        open: true,
        openable: false,
        items: [
            {
                value: 'Мужчина',
                selected: false,
                clickEvent: 'edit:gender-male-click',
            },
            {
                value: 'Женщина',
                selected: false,
                clickEvent: 'edit:gender-female-click',
            },
        ],
        buttonEvent: 'edit:gender-click',
    },
    preferField: {
        title: 'Кого вы ищите',
        valid: true,
        open: true,
        openable: false,
        items: [
            {
                value: 'Мужчину',
                selected: false,
                clickEvent: 'edit:prefer-male-click',
            },
            {
                value: 'Женщину',
                selected: false,
                clickEvent: 'edit:prefer-female-click',
            },
            {
                value: 'Не важно',
                selected: false,
                clickEvent: 'edit:prefer-any-click',
            },
        ],
        buttonEvent: 'edit:prefer-click',
    },
    tagsField: {
        title: 'Тэги',
        valid: true,
        open: false,
        openable: true,
        items: [
            {
                value: 'anime',
                selected: false,
                clickEvent: 'edit:tag-click',
            },
            {
                value: 'music',
                selected: false,
                clickEvent: 'edit:tag-click',
            },
            {
                value: 'gaming',
                selected: false,
                clickEvent: 'edit:tag-click',
            },
            {
                value: 'science',
                selected: false,
                clickEvent: 'edit:tag-click',
            },
            {
                value: 'sport',
                selected: false,
                clickEvent: 'edit:tag-click',
            },
        ],
        buttonEvent: 'edit:tags-click',
    },
    apiErrorLoadCondition: false,
};

EditStore.set(initData);

export { EditStore };
