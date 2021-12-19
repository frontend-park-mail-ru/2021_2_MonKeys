import BaseStore from './storeBase.js';
import * as stream from 'stream';

export interface ProfileData {
    id?: number;
    name?: string;
    gender?: string;
    prefer?: string;
    age?: string;
    date?: string;
    description?: string;
    imgs?: string[];
    tags?: Set<string>;
    reportStatus?: string;
}

const ProfileStore = new BaseStore<ProfileData>();

ProfileStore.set({
    imgs: [],
    tags: new Set(),
    prefer: '',
});

console.log(ProfileStore);

export { ProfileStore };
