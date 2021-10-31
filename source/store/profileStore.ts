import BaseStore from './storeBase.js';

export interface ProfileData {
    id?: string;
    name?: string;
    age?: string;
    date?: string;
    description?: string;
    imgs?: string[];
    tags?: Set<string>;
}

const ProfileStore = new BaseStore<ProfileData>();

ProfileStore.set({
    imgs: [],
});

export { ProfileStore };
