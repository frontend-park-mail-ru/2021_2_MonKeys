import BaseStore from "./storeBase.js";

export interface ProfileData {
    id?: string;
    name?: string;
    age?: string;
    date?: string;
    description?: string;
    imgSrc?: Set<string>;
    tags?: Set<string>;
}

const ProfileStore = new BaseStore<ProfileData>();

export { ProfileStore };
