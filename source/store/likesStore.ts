import { ProfileData } from './profileStore.js';
import BaseStore from './storeBase.js';

export type MatchCardData = ProfileData;

export interface LikesData {
    profiles: MatchCardData[];
    mathesCount: number;
}

const LikesStore = new BaseStore<LikesData>();

LikesStore.set({
    profiles: [],
    mathesCount: 0,
});

export default LikesStore;
