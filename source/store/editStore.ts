import { ItemListProps } from '../components/edit/itemList.js';
import BaseStore from './storeBase.js';
import { EVENTS } from '../dispatcher/events.js';
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
                clickEvent: EVENTS.EDIT_GENDER_MALE_CLICK,
            },
            {
                value: 'Женщина',
                selected: false,
                clickEvent: EVENTS.EDIT_GENDER_FEMALE_CLICK,
            },
        ],
        buttonEvent: 99999999,
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
                clickEvent: EVENTS.EDIT_PREFER_MALE_CLICK,
            },
            {
                value: 'Женщину',
                selected: false,
                clickEvent: EVENTS.EDIT_PREFER_FEMALE_CLICK,
            },
            {
                value: 'Не важно',
                selected: false,
                clickEvent: EVENTS.EDIT_PREFER_ANY_CLICK,
            },
        ],
        buttonEvent: 999999999999,
    },
    tagsField: {
        title: 'Интересы',
        valid: true,
        open: false,
        openable: true,
        alignCenter: true,
        items: [
            {
                value: 'аниме',
                selected: false,
                clickEvent: EVENTS.EDIT_TAG_CLICK,
            },
            {
                value: 'музыка',
                selected: false,
                clickEvent: EVENTS.EDIT_TAG_CLICK,
            },
            {
                value: 'игры',
                selected: false,
                clickEvent: EVENTS.EDIT_TAG_CLICK,
            },
            {
                value: 'наука',
                selected: false,
                clickEvent: EVENTS.EDIT_TAG_CLICK,
            },
            {
                value: 'спорт',
                selected: false,
                clickEvent: EVENTS.EDIT_TAG_CLICK,
            },
        ],
        buttonEvent: EVENTS.EDIT_TAGS_CLICK,
    },
};

EditStore.set(initData);

export { EditStore };
