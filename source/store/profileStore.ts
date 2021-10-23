import BaseStore from "./storeBase.js";

export interface ProfileData {
    id?: number;
    name?: string;
    age?: string;
    date?: string;
    description?: string;
    imgSrc?: string;
    tags?: Set<string>;
}

let ProfileStore = new BaseStore<ProfileData>();

export { ProfileStore };
