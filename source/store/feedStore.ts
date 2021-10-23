import { ProfileData } from "./profileStore.js";
import BaseStore from "./storeBase.js";

export type FeedCardData = ProfileData

export interface FeedData {
    profiles: FeedCardData[];
    counter: number;
}

export default new BaseStore<FeedData>();