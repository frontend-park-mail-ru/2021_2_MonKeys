import EventBus from './eventBus.js';
import feedStore from '../store/feedStore.js';
import reactions from '../constants/reactions.js';
import { likesRequest } from '../requests/likesRequest.js';

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
            // some effects when match
            console.log(response);
        });

        data.counter++;
        if (data.profiles[data.counter]) {
            data.outOfCards = false;
        } else {
            data.outOfCards = true;
        }
        feedStore.set(data);
    });
};
