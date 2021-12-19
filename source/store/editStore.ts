import { ItemListProps } from '../components/edit/itemList.js';
import BaseStore from './storeBase.js';
import { EVENTS } from '../dispatcher/events.js';
export interface EditData {
    nameFieldStatus: number;
    birthDateFieldStatus: number;
    genderFieldStatus: number;
    imgFieldStatus: number;

    gender: number;

    preferField?: ItemListProps;
    preferErrorClass?: string;
    tagsField?: ItemListProps;
    tags?;
}

const EditStore = new BaseStore<EditData>();

export namespace FieldStatus {
    export const Correct = 0;
    export const Hint = 1;
    export const Error = 2;
}

export namespace Gender {
    export const NotSelected = 0;
    export const Male = 1;
    export const Female = 2;
}

const initData = {
    nameFieldStatus: FieldStatus.Correct,
    birthDateFieldStatus: FieldStatus.Correct,
    genderFieldStatus: FieldStatus.Correct,
    imgFieldStatus: FieldStatus.Correct,

    gender: Gender.NotSelected,

    preferField: {
        title: 'Кого вы ищете',
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
                value: 'Все равно',
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
