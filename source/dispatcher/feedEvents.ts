import EventBus from './eventBus.js';
import feedStore from '../store/feedStore.js';
import LikesStore from '../store/likesStore.js';
import reactions from '../constants/reactions.js';
import { likesRequest } from '../requests/likesRequest.js';
import { matchRequest } from '../requests/matchRequest.js';
import { feedRequest } from '../requests/feedRequest.js';
import { HTTPSuccess } from '../constants/HTTPStatus.js';
import { requestMoreCardsThreshold } from '../constants/feed.js';

const animationThanLikeAndReset = () => {
    console.log('HELLO');
    EventBus.dispatch('feed:reaction', reactions.like);
    const card = document.querySelectorAll<HTMLElement>('.card')[0];
    card.style.transform = '';
    card.style.animation = '';
    card.style.opacity = '1';
    const heart = document.querySelectorAll<HTMLElement>('img')[3];
    const dislike = document.querySelectorAll<HTMLElement>('img')[1];
    dislike.style.width = `36px`;
    dislike.style.height = `36px`;
    dislike.style.transform = ``;
    dislike.style.opacity = `1`;
    dislike.style.animation = '';
    heart.style.width = `36px`;
    heart.style.height = `36px`;
    heart.style.transform = ``;
    heart.style.opacity = `1`;
    heart.style.animation = '';
    card.removeEventListener('animationend', animationThanLikeAndReset);
};

const animationThanDislikeAndReset = () => {
    console.log('HELLO');
    EventBus.dispatch('feed:reaction', reactions.like);
    const card = document.querySelectorAll<HTMLElement>('.card')[0];
    card.style.transform = '';
    card.style.animation = '';
    card.style.opacity = '1';
    const heart = document.querySelectorAll<HTMLElement>('img')[3];
    const dislike = document.querySelectorAll<HTMLElement>('img')[1];
    dislike.style.width = `36px`;
    dislike.style.height = `36px`;
    dislike.style.transform = ``;
    dislike.style.opacity = `1`;
    dislike.style.animation = '';
    heart.style.width = `36px`;
    heart.style.height = `36px`;
    heart.style.transform = ``;
    heart.style.opacity = `1`;
    heart.style.animation = '';
    card.removeEventListener('animationend', animationThanDislikeAndReset);
};

export const FeedEventsRegister = () => {
    EventBus.register('feed:like-button', () => {
        const card = document.querySelectorAll<HTMLElement>('.card')[0];
        card.style.animation = 'swipedRight 1s ease 1';
        card.addEventListener('animationend', animationThanLikeAndReset);
    });
    EventBus.register('feed:dislike-button', () => {
        const card = document.querySelectorAll<HTMLElement>('.card')[0];
        card.style.animation = 'swipedLeft 1s ease 1';
        card.addEventListener('animationend', animationThanDislikeAndReset);
    });
    EventBus.register('feed:expand-button', () => {
        const data = feedStore.get();
        data.apiErrorLoadCondition = false;
        data.expanded = true;
        feedStore.set(data);
    });
    EventBus.register('feed:shrink-button', () => {
        const data = feedStore.get();
        data.apiErrorLoadCondition = false;
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
        data.apiErrorLoadCondition = false;
        console.log(`REACTED ${data.profiles[data.counter].id}`);
        likesRequest(data.profiles[data.counter].id, reactionID)
            .then((response) => {
                if (response.status === HTTPSuccess) {
                    if (response.data.status === HTTPSuccess) {
                        if (response.data.body.match) {
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
                    const feedData = feedStore.get();
                    feedData.apiErrorLoadCondition = true;
                    feedStore.set(feedData);
                }

                data.counter++;

                if (data.counter === requestMoreCardsThreshold) {
                    feedRequest().then((response) => {
                        if (response.status === HTTPSuccess) {
                            if (response.data.status === HTTPSuccess) {
                                if (response.data.body !== null) {
                                    data.profiles = response.data.body;
                                } else {
                                    data.profiles = [];
                                    data.outOfCards = true;
                                }
                                data.counter = 0;

                                if (data.profiles[data.counter]) {
                                    data.outOfCards = false;
                                } else {
                                    data.outOfCards = true;
                                }
                                feedStore.set(data);
                            } else {
                                throw '400';
                            }
                        } else {
                            const feedData = feedStore.get();
                            feedData.apiErrorLoadCondition = true;
                            feedStore.set(feedData);
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
            })
            .catch(() => {
                const feedData = feedStore.get();
                feedData.apiErrorLoadCondition = true;
                feedStore.set(feedData);
            });
    });
};
