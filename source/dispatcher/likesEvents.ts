import EventBus from './eventBus.js';
import { likesRequest } from '../requests/likesRequest.js';
import { feedRequest } from '../requests/feedRequest.js';
import { HTTPSuccess } from '../constants/HTTPStatus.js';
import LikesStore from '../store/likesStore.js';
import feedStore from '../store/feedStore.js';
import { MatchesStore } from '../store/matchStore.js';
import { matchRequest } from '../requests/matchRequest.js';

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
    EventBus.register('likes:shrink-button', () => {
        const storeData = LikesStore.get();
        storeData.expended = false;
        LikesStore.set(storeData);
    });
    EventBus.register('likes:reaction', (payload) => {
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
            feedRequest().then((data) => {
                if (data.status === HTTPSuccess) {
                    throw 'bad response';
                }

                if (data.body) {
                    feedData.profiles = data.body;
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
};
