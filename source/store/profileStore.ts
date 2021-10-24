import BaseStore from "./storeBase.js";

export interface ProfileData {
    id?: number;
    name?: string;
    age?: number;
    date?: string;
    description?: string;
    imgSrc?: string;
    tags?: Set<string>;
}

const ProfileStore = new BaseStore<ProfileData>();

export { ProfileStore };
