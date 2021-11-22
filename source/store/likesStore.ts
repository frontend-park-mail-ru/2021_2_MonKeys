import { ProfileData } from './profileStore.js';
import BaseStore from './storeBase.js';

export type LikeCardData = ProfileData;

export interface LikesData {
    profiles: LikeCardData[];
    likesCount: number;

    expended: boolean;
    userIndex: number;
    reported: boolean;
}

const LikesStore = new BaseStore<LikesData>();

LikesStore.set({
    profiles: [],
    likesCount: 0,
    expended: false,
    userIndex: 0,
    reported: false,
});

export default LikesStore;
