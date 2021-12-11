import EventBus from './eventBus.js';
import { likesRequest } from '../requests/likesRequest.js';
import { feedRequest } from '../requests/feedRequest.js';
import { HTTPSuccess } from '../utils/constants/HTTPStatus.js';
import LikesStore from '../store/likesStore.js';
import feedStore from '../store/feedStore.js';
import { MatchesStore } from '../store/matchStore.js';
import { matchRequest } from '../requests/matchRequest.js';
import { EVENTS } from './events.js';
import { smallPeriodPrice, mediumPeriodPrice, bigPeriodPrice } from '../constants/prices.js';
import { paymentRequest } from '../requests/paymentRequest.js';

export const LikesEventsRegister = () => {
    EventBus.register(EVENTS.LIKES_EXPAND_BUTTON, (userID) => {
        const storeData = LikesStore.get();
        storeData.expended = true;
        let index: number;
        if (storeData && storeData.profiles) {
            for (let i = 0; i < storeData.likesCount; i++) {
                if (storeData.profiles[i].id === userID) {
                    index = i;
                    break;
                }
            }
            storeData.userIndex = index;
            LikesStore.set(storeData);
        }
    });
    EventBus.register(EVENTS.LIKES_SHRINK_BUTTON, () => {
        const storeData = LikesStore.get();
        storeData.expended = false;
        LikesStore.set(storeData);
    });
    EventBus.register(EVENTS.LIKES_REACTION, (payload) => {
        const storeData = LikesStore.get();
        storeData.expended = false;
        LikesStore.set(storeData);
        if (storeData && storeData.profiles) {
            const newProfiles = [];
            let newCount = 0;
            for (let i = 0; i < storeData.likesCount; i++) {
                if (storeData.profiles[i].id !== payload.userID) {
                    newProfiles.push(storeData.profiles[i]);
                    newCount++;
                }
            }
            storeData.profiles = newProfiles;
            storeData.likesCount = newCount;
            LikesStore.set(storeData);
        }

        likesRequest(payload.userID, payload.reactionType).then((data) => {
            if (data.status === HTTPSuccess) {
                throw 'bad response';
            }

            if (data.body.match) {
                matchRequest().then((matchData) => {
                    const matchesData = MatchesStore.get();
                    matchesData.matches = matchData.body.allUsers;
                    matchesData.matchesTotal = matchData.body.matchesCount;
                    MatchesStore.set(matchesData);
                });
            }

            const feedData = feedStore.get();
            feedRequest().then((feedDataResp) => {
                if (feedDataResp.status === HTTPSuccess) {
                    throw 'bad response';
                }

                if (feedDataResp.body) {
                    feedData.profiles = feedDataResp.body;
                } else {
                    feedData.profiles = [];
                    feedData.outOfCards = true;
                }
                feedData.counter = 0;

                if (feedData.profiles[feedData.counter]) {
                    feedData.outOfCards = false;
                } else {
                    feedData.outOfCards = true;
                }
                feedStore.set(feedData);
            });
        });
    });
    EventBus.register(EVENTS.LIKES_CHOICE_PAYMENT, (cost: number) => {
        const likesData = LikesStore.get();
        switch (cost) {
            case smallPeriodPrice:
                likesData.card150Class = 'payment-card payment-card_active';
                likesData.card350Class = 'payment-card';
                likesData.card650Class = 'payment-card';
                likesData.choosedSubscription = smallPeriodPrice;
                LikesStore.set(likesData);
                break;
            case mediumPeriodPrice:
                likesData.card350Class = 'payment-card payment-card_active';
                likesData.card150Class = 'payment-card';
                likesData.card650Class = 'payment-card';
                likesData.choosedSubscription = mediumPeriodPrice;
                LikesStore.set(likesData);
                break;
            case bigPeriodPrice:
                likesData.card650Class = 'payment-card payment-card_active';
                likesData.card150Class = 'payment-card';
                likesData.card350Class = 'payment-card';
                likesData.choosedSubscription = bigPeriodPrice;
                LikesStore.set(likesData);
                break;
        }
    });
    EventBus.register(EVENTS.LIKES_PAYMENT, () => {
        const subscriptionCost = LikesStore.get().choosedSubscription;
        console.log(subscriptionCost);
        paymentRequest(subscriptionCost.toString()).then((response) => {
            window.location.href = response.body.redirectUrl;
        });
    });
};
