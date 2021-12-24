import BaseStore from './storeBase.js';

export interface EditData {
    nameFieldStatus: number;
    birthDateFieldStatus: number;
    genderFieldStatus: number;
    preferFieldStatus: number;
    imgFieldStatus: number;

    gender: number;

    tagsField: {
        open: boolean;
        tags: {
            tag: string;
            selected: boolean;
        }[];
    };

    preferField: {
        prefers: {
            value: string;
            tag: string;
            selected: boolean;
        }[];
    };
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
    preferFieldStatus: FieldStatus.Correct,
    imgFieldStatus: FieldStatus.Correct,

    gender: Gender.NotSelected,

    tagsField: {
        open: false,
        tags: [
            {
                tag: 'рок',
                selected: false,
            },
            {
                tag: 'аниме',
                selected: false,
            },
            {
                tag: 'комедии',
                selected: false,
            },
            {
                tag: 'спорт',
                selected: false,
            },
            {
                tag: 'наука',
                selected: false,
            },
            {
                tag: 'футбол',
                selected: false,
            },
            {
                tag: 'рэп',
                selected: false,
            },
            {
                tag: 'игры',
                selected: false,
            },
        ],
    },

    preferField: {
        prefers: [
            {
                value: 'Мужчину',
                tag: 'male',
                selected: false,
            },
            {
                value: 'Женщину',
                tag: 'female',
                selected: false,
            },
            {
                value: 'Все равно',
                tag: '',
                selected: false,
            },
        ],
    },
};

EditStore.set(initData);

export { EditStore };
