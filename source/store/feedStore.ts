import { ProfileData } from "./profileStore.js";
import BaseStore from "./storeBase.js";

export interface FeedCardData extends ProfileData {
    // Maybe later
}

export interface FeedData {
    profiles: FeedCardData[];
    counter: number;
}

export default new BaseStore<FeedData>();