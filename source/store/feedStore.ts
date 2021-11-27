import { ProfileData } from './profileStore.js';
import BaseStore from './storeBase.js';

export type FeedCardData = ProfileData;

export interface FeedData {
    profiles: FeedCardData[];
    counter: number;
    outOfCards: boolean;
    expanded: boolean;
}

const feedStore = new BaseStore<FeedData>();

feedStore.set({
    profiles: [],
    counter: 0,
    outOfCards: false,
    expanded: false,
});

export default feedStore;
