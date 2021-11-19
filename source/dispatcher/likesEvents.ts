import EventBus from './eventBus.js';
import { likesRequest } from '../requests/likesRequest.js';
import { feedRequest } from '../requests/feedRequest.js';
import { HTTPSuccess } from '../constants/HTTPStatus.js';
import LikesStore from '../store/likesStore.js';
import feedStore from '../store/feedStore.js';

export const LikesEventsRegister = () => {
    EventBus.register('likes:expand-button', (userID) => {
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
    EventBus.register('likes:shrink-button', (userID) => {
        const storeData = LikesStore.get();
        storeData.expended = false;
        LikesStore.set(storeData);
    });
    EventBus.register('likes:reaction', (payload) => {
        // const data = feedStore.get();
        // data.apiErrorLoadCondition = false;
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

        likesRequest(payload.userID, payload.reactionType).then((response) => {
            if (response.status === HTTPSuccess) {
                if (response.data.status === HTTPSuccess) {
                    if (response.data.body.match) {
                        console.log('match');
                        // matchRequest().then((matchResponse) => {
                        //     const likesData = LikesStore.get();
                        //     likesData.profiles = matchResponse.data.body.allUsers;
                        //     likesData.mathesCount = matchResponse.data.body.matchesCount;
                        //     LikesStore.set(likesData);
                        // });
                    }
                } else {
                    throw '400';
                }
            } else {
                // const feedData = feedStore.get();
                // feedData.apiErrorLoadCondition = true;
                // feedStore.set(feedData);
            }

            const feedData = feedStore.get();
            feedRequest().then((response) => {
                if (response.status === HTTPSuccess) {
                    if (response.data.status === HTTPSuccess) {
                        if (response.data.body !== null) {
                            feedData.profiles = response.data.body;
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
                    } else {
                        throw '400';
                    }
                } else {
                    // const feedData = feedStore.get();
                    // feedData.apiErrorLoadCondition = true;
                    // feedStore.set(feedData);
                }
            });
        });
    });
};
