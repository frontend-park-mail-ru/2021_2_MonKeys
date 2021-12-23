import BaseStore from './storeBase.js';

export interface ProfileData {
    id: number;
    name: string;
    gender: string;
    prefer: string;
    age: string;
    date: string;
    description: string;
    imgs: string[];
    tags: Set<string>;
    reportStatus: string;

    birthDay: string;
    birthMonth: string;
    birthYear: string;
}

const ProfileStore = new BaseStore<ProfileData>();

ProfileStore.set({
    id: -1,
    name: '',
    gender: '',
    prefer: '',
    age: '',
    date: '',
    description: '',
    imgs: [],
    tags: new Set(),
    reportStatus: '',

    birthDay: '',
    birthMonth: '',
    birthYear: '',
});

export { ProfileStore };
