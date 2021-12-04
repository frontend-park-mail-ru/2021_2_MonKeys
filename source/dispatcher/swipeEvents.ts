import eventBus from './eventBus.js';
import EventBus from './eventBus.js';
import { swipesAnimation } from '../constants/animations.js';
import { EVENTS } from './events.js';
import { throttle } from '../utils/throttle.js';
export interface cardMoveOffset {
    offsetX: number;
    offsetY: number;
}

declare global {
    interface Window {
        startX: number;
        startY: number;
        offsetX: number;
        offsetY: number;
    }
}

export const SwipeEvenetsRegister = () => {
    EventBus.register(EVENTS.SWIPE_START, () => {
        //...
    });

    const OneFrameTime = 16;
    EventBus.register(
        EVENTS.SWIPE_MOVE,

        throttle((cardMoveOffset) => {
            const card = document.querySelectorAll<HTMLElement>('.card')[0];

            const heart = document.querySelector<HTMLElement>('img[alt="like"]');
            let heartTranslateX = 0;
            let heartTranslateY = 0;

            // X swipesAnimtion.iconXTranslateModifier for x scale
            // X 2 for y scale like dislike translate
            if (
                -cardMoveOffset.diffX * swipesAnimation.iconXTranslateModifier >
                -swipesAnimation.iconXTranslateThreshhold
            ) {
                heartTranslateX = -cardMoveOffset.diffX * swipesAnimation.iconXTranslateModifier;
            } else {
                heartTranslateX = -swipesAnimation.iconXTranslateThreshhold;
            }
            if (-cardMoveOffset.diffX * 2 > -swipesAnimation.iconYTranslateThreshhold) {
                heartTranslateY = -cardMoveOffset.diffX * 2;
            } else {
                heartTranslateY = -swipesAnimation.iconYTranslateThreshhold;
            }

            heart.style.transform = `translate(${heartTranslateX - cardMoveOffset.diffX}px, ${
                heartTranslateY - cardMoveOffset.diffY
            }px)`;
            heart.style.width = `${Math.round(swipesAnimation.iconDefaultWidth + cardMoveOffset.diffX / 2)}px`;
            heart.style.height = `${Math.round(swipesAnimation.iconDefaultWidth + cardMoveOffset.diffX / 2)}px`;
            // heart.style.opacity = `${1 - cardMoveOffset.diffX / 300}`;

            const dislike = document.querySelector<HTMLElement>('img[alt="dislike"]');

            let dislikeTranslateX = 0;
            let dislikeTranslateY = 0;

            // X swipesAnimtion.iconXTranslateModifier for x scale
            // X 2 for y scale like dislike translate
            if (
                -cardMoveOffset.diffX * swipesAnimation.iconXTranslateModifier <
                swipesAnimation.iconXTranslateThreshhold
            ) {
                dislikeTranslateX = -cardMoveOffset.diffX * swipesAnimation.iconXTranslateModifier;
            } else {
                dislikeTranslateX = swipesAnimation.iconXTranslateThreshhold;
            }
            if (cardMoveOffset.diffX * 2 > -swipesAnimation.iconYTranslateThreshhold) {
                dislikeTranslateY = cardMoveOffset.diffX * 2;
            } else {
                dislikeTranslateY = -swipesAnimation.iconYTranslateThreshhold;
            }

            dislike.style.transform = `translate(${dislikeTranslateX - cardMoveOffset.diffX}px, ${
                dislikeTranslateY - cardMoveOffset.diffY
            }px)`;
            dislike.style.width = `${Math.round(swipesAnimation.iconDefaultWidth - cardMoveOffset.diffX / 2)}px`;
            dislike.style.height = `${Math.round(swipesAnimation.iconDefaultWidth - cardMoveOffset.diffX / 2)}px`;

            card.style.transform = `translate(${cardMoveOffset.diffX}px, ${cardMoveOffset.diffY}px)`;

            // ----->>>> CONSTANTS
            const rotationScale = 10;
            heart.style.transform += `rotate(${-cardMoveOffset.diffX / rotationScale}deg)`;
            dislike.style.transform += `rotate(${-cardMoveOffset.diffX / rotationScale}deg)`;
            card.style.transform += `rotate(${cardMoveOffset.diffX / rotationScale}deg)`;
        }, OneFrameTime)
    );
    EventBus.register(EVENTS.SWIPE_END, () => {
        let card = document.querySelectorAll<HTMLElement>('.card')[0];
        if (!card) {
            card = document.querySelectorAll<HTMLElement>('card-expended')[0];
        }
        if (window.offsetX > swipesAnimation.likeXThreshhold) {
            window.startX = 0;
            eventBus.dispatch(EVENTS.FEED_LIKE_BUTTON);
            return;
        }

        if (window.offsetX < -swipesAnimation.likeXThreshhold) {
            window.startX = 0;
            eventBus.dispatch(EVENTS.FEED_DISLIKE_BUTTON);
            return;
        }
        const heart = document.querySelector<HTMLElement>('img[alt="like"]');
        const dislike = document.querySelector<HTMLElement>('img[alt="dislike"]');
        card.style.animation = 'returnToDefault 1s ease 1';
        heart.style.animation = 'returnToDefaultAction 1s ease 1';
        dislike.style.animation = 'returnToDefaultAction 1s ease 1';

        card.addEventListener('animationend', () => {
            const card = document.querySelectorAll<HTMLElement>('.card')[0];
            const heart = document.querySelector<HTMLElement>('img[alt="like"]');
            const dislike = document.querySelector<HTMLElement>('img[alt="dislike"]');
            if (card && heart && dislike) {
                dislike.style.width = `${swipesAnimation.iconDefaultWidth}px`;
                dislike.style.height = `${swipesAnimation.iconDefaultWidth}px`;
                dislike.style.transform = ``;
                dislike.style.opacity = `1`;
                dislike.style.animation = '';
                heart.style.width = `${swipesAnimation.iconDefaultWidth}px`;
                heart.style.height = `${swipesAnimation.iconDefaultWidth}px`;
                heart.style.transform = ``;
                heart.style.opacity = `1`;
                heart.style.animation = '';
                card.style.transform = '';
                card.style.animation = '';
            }
        });
    });
};
