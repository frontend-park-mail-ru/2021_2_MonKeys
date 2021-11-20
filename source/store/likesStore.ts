import { ProfileData } from './profileStore.js';
import BaseStore from './storeBase.js';

export type LikeCardData = ProfileData;

export interface LikesData {
    profiles: LikeCardData[];
    likesCount: number;

    expended: boolean;
    userIndex: number;
}

const LikesStore = new BaseStore<LikesData>();

LikesStore.set({
    profiles: [],
    likesCount: 0,
    expended: false,
    userIndex: 0,
});

export default LikesStore;
