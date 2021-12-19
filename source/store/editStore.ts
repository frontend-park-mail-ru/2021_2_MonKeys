import { ItemListProps } from '../components/edit/itemList.js';
import BaseStore from './storeBase.js';
import { EVENTS } from '../dispatcher/events.js';

export interface EditData {
    nameFieldStatus: number;
    birthDateFieldStatus: number;
    genderFieldStatus: number;
    imgFieldStatus: number;

    gender: number;

    tagsField: {
        open: boolean;
        tags: {
            tag: string;
            selected: boolean;
        }[];
    };

    preferField?: ItemListProps;
    preferErrorClass?: string;
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

    tagsField: {
        open: false,
        tags: [
            {
                tag: 'аниме',
                selected: false,
            },
            {
                tag: 'музыка',
                selected: false,
            },
            {
                tag: 'игры',
                selected: false,
            },
            {
                tag: 'наука',
                selected: false,
            },
            {
                tag: 'спорт',
                selected: false,
            },
        ],
    },

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
};

EditStore.set(initData);

export { EditStore };
