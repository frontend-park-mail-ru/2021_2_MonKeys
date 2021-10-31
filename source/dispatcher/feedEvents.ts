import EventBus from './eventBus.js';
import feedStore from '../store/feedStore.js';
import LikesStore from '../store/likesStore.js';
import reactions from '../constants/reactions.js';
import { likesRequest } from '../requests/likesRequest.js';
import { matchRequest } from '../requests/matchRequest.js';
import { feedRequest } from '../requests/feedRequest.js';
import { HTTPSuccess } from '../constants/HTTPStatus.js';

export const FeedEventsRegister = () => {
    EventBus.register('feed:like-button', () => {
        EventBus.dispatch('feed:reaction', reactions.like);
    });
    EventBus.register('feed:dislike-button', () => {
        EventBus.dispatch('feed:reaction', reactions.dislike);
    });
    EventBus.register('feed:expand-button', () => {
        const data = feedStore.get();
        data.expanded = true;
        feedStore.set(data);
    });
    EventBus.register('feed:shrink-button', () => {
        const data = feedStore.get();
        data.expanded = false;
        feedStore.set(data);
    });
    EventBus.register('feed:swipe-start', () => {
        //...
    });
    EventBus.register('feed:swipe-move', () => {
        //...
    });
    EventBus.register('feed:swipe-end', () => {
        //...
    });
    EventBus.register('feed:reaction', (reactionID) => {
        const data = feedStore.get();

        likesRequest(data.profiles[data.counter].id, reactionID).then((response) => {
            if (response.status === HTTPSuccess) {
                if (response.data.status === HTTPSuccess) {
                    if (response.data.body.match) {
                        matchRequest().then((matchResponse) => {
                            const likesData = LikesStore.get();
                            likesData.profiles = matchResponse.data.body.allUsers;
                            likesData.mathesCount = matchResponse.data.body.matchesCount;
                            LikesStore.set(likesData);
                        });
                    }
                } else {
                    console.log('error');
                }
            } else {
                console.log('server internal error');
            }
        });

        data.counter++;
        console.log(data.counter);
        if (data.counter === 5) {
            feedRequest().then((response) => {
                if (response.status === HTTPSuccess) {
                    if (response.data.status === HTTPSuccess) {
                        data.profiles = response.data.body;
                        data.counter = 0;

                        if (data.profiles[data.counter]) {
                            data.outOfCards = false;
                        } else {
                            data.outOfCards = true;
                        }
                        feedStore.set(data);
                    } else {
                        console.log('error');
                    }
                } else {
                    console.log('server internal error');
                }
            });
        } else {
            if (data.profiles[data.counter]) {
                data.outOfCards = false;
            } else {
                data.outOfCards = true;
            }
            feedStore.set(data);
        }
    });
};
