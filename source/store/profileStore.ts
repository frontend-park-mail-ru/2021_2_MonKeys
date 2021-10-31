<<<<<<< HEAD
import BaseStore from './storeBase.js';

export interface ProfileData {
    id?: string;
    name?: string;
    age?: string;
    date?: string;
    description?: string;
    imgSrc?: string[];
    tags?: Set<string>;
}

const ProfileStore = new BaseStore<ProfileData>();

ProfileStore.set({
    imgSrc: [],
});

export { ProfileStore };
=======
import BaseStore from './storeBase.js';

export interface ProfileData {
    id?: string;
    name?: string;
    age?: string;
    date?: string;
    description?: string;
    imgSrc?: string[];
    tags?: Set<string>;
}

const ProfileStore = new BaseStore<ProfileData>();

export { ProfileStore };
>>>>>>> b29b41b2a504e6815c84e537aa02dfe8b109a80f
