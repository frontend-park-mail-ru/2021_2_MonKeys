import EventBus from './eventBus.js';
import feedStore from '../store/feedStore.js';
import reactions from '../constants/reactions.js';
import { likesRequest } from '../requests/likesRequest.js';
import { feedRequest } from '../requests/feedRequest.js';
import { HTTPSuccess } from '../utils/constants/HTTPStatus.js';
import { requestMoreCardsThreshold } from '../constants/feed.js';
import { resetCarousel } from '../modules/carousel.js';
import { EVENTS } from './events.js';
import { unloadImageList } from '../modules/cache.js';

const animationThanLikeAndReset = () => {
    EventBus.dispatch(EVENTS.FEED_REACTION, reactions.like);
    let card = document.querySelectorAll<HTMLElement>('.card')[0];

    if (!card) {
        card = document.querySelectorAll<HTMLElement>('.card-expended')[0];
        card.style.transform = '';
        card.style.animation = '';
        card.style.opacity = '1';
        card.removeEventListener('animationend', animationThanLikeAndReset);
        return;
    }
    card.style.transform = '';
    card.style.animation = '';
    card.style.opacity = '1';
    const heart = document.querySelector<HTMLElement>('img[alt="like"]');
    const dislike = document.querySelector<HTMLElement>('img[alt="dislike"]');
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
    EventBus.dispatch(EVENTS.FEED_REACTION, reactions.dislike);
    let card = document.querySelectorAll<HTMLElement>('.card')[0];
    if (!card) {
        card = document.querySelectorAll<HTMLElement>('.card-expended')[0];
        card.style.transform = '';
        card.style.animation = '';
        card.style.opacity = '1';
        card.removeEventListener('animationend', animationThanDislikeAndReset);
        return;
    }
    card.style.transform = '';
    card.style.animation = '';
    card.style.opacity = '1';
    const heart = document.querySelector<HTMLElement>('img[alt="like"]');
    const dislike = document.querySelector<HTMLElement>('img[alt="dislike"]');
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
    EventBus.register(EVENTS.FEED_LIKE_BUTTON, () => {
        let card = document.querySelectorAll<HTMLElement>('.card')[0];
        if (!card) {
            card = document.querySelectorAll<HTMLElement>('.card-expended')[0];
        }
        card.style.animation = 'swipedRight 0.5s ease 1';
        card.addEventListener('animationend', animationThanLikeAndReset);
    });
    EventBus.register(EVENTS.FEED_DISLIKE_BUTTON, () => {
        let card = document.querySelectorAll<HTMLElement>('.card')[0];
        if (!card) {
            card = document.querySelectorAll<HTMLElement>('.card-expended')[0];
        }
        card.style.animation = 'swipedLeft 0.5s ease 1';
        card.addEventListener('animationend', animationThanDislikeAndReset);
    });
    EventBus.register(EVENTS.FEED_EXPAND_BUTTON, () => {
        const data = feedStore.get();
        const cardImg = document.querySelectorAll<HTMLElement>('.card')[0];
        const expand = document.querySelector<HTMLElement>('img[alt="expand"]');
        expand.style.animation = 'rotate180 0.3s ease 1';
        cardImg.style.animation = 'shrinkCardImg 0.3s ease 1';
        cardImg.addEventListener('animationend', () => {
            const cardImg = document.querySelectorAll<HTMLElement>('.card')[0];
            const expand = document.querySelector<HTMLElement>('img[alt="expand"]');
            if (expand) {
                expand.style.animation = '';
            }
            if (cardImg) {
                cardImg.style.animation = '';
            }

            data.expanded = true;
            feedStore.set(data);
        });
    });
    EventBus.register(EVENTS.FEED_SHRINK_BUTTON, () => {
        const data = feedStore.get();
        const shrink = document.querySelectorAll<HTMLElement>('.actions__button-shrink')[0];
        const card = document.querySelectorAll<HTMLElement>('.img-card_size_medium')[0];
        console.log(card);
        card.style.animation = 'expandCardImg 0.3s ease 1';
        shrink.style.animation = 'rotate180 0.3s ease 1';
        card.addEventListener('animationend', () => {
            const cardImg = document.querySelectorAll<HTMLElement>('.actions__button-shrink')[0];
            const expand = document.querySelectorAll<HTMLElement>('.img-card_size_medium')[0];
            if (expand) {
                expand.style.animation = '';
            }
            if (cardImg) {
                cardImg.style.animation = '';
            }
            data.expanded = false;
            feedStore.set(data);
        });
    });

    EventBus.register(EVENTS.FEED_REACTION, (reactionID) => {
        resetCarousel();
        console.log(reactionID);
        console.log(reactions.dislike);
        const data = feedStore.get();
        data.expanded = false;
        if (reactionID === reactions.dislike) {
            unloadImageList(data.profiles[data.counter].imgs);
            console.log(data.profiles[data.counter].imgs);
        }
        likesRequest(data.profiles[data.counter].id, reactionID).then((likesData) => {
            if (likesData.status !== HTTPSuccess) {
                throw 'bad response';
            }

            if (likesData.body.match) {
                // ..
            }

            data.counter++;

            if (data.counter === requestMoreCardsThreshold) {
                feedRequest().then((feedData) => {
                    if (feedData.status !== HTTPSuccess) {
                        throw 'bad response';
                    }

                    if (feedData.body.Users !== null) {
                        data.profiles = feedData.body.Users;
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
    });
};
