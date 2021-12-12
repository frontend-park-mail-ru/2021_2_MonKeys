import { ProfileData } from './profileStore.js';
import BaseStore from './storeBase.js';

export type LikeCardData = ProfileData;

export interface LikesData {
    profiles: LikeCardData[];
    likesCount: number;

    expended: boolean;
    userIndex: number;
    reported: boolean;

    card150Class: string;
    card350Class: string;
    card650Class: string;
    choosedSubscriptionAmount: number;
    choosedSubscriptionPeriod: number;
}

const LikesStore = new BaseStore<LikesData>();

LikesStore.set({
    profiles: [],
    likesCount: 0,
    expended: false,
    userIndex: 0,
    reported: false,
    card150Class: 'payment-card',
    card350Class: 'payment-card',
    card650Class: 'payment-card',
    choosedSubscriptionAmount: 0,
    choosedSubscriptionPeriod: 0,
});

export default LikesStore;
