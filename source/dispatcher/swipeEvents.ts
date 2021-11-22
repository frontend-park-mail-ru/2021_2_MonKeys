import eventBus from './eventBus.js';
import EventBus from './eventBus.js';
import { swipesAnimation } from '../constants/animations.js';
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
    EventBus.register('swipe:start', () => {
        //...
    });
    EventBus.register('swipe:move', (cardMoveOffset) => {
        const card = document.querySelectorAll<HTMLElement>('.card')[0];

        const heart = document.querySelectorAll<HTMLElement>('img')[3];
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

        const dislike = document.querySelectorAll<HTMLElement>('img')[1];

        let dislikeTranslateX = 0;
        let dislikeTranslateY = 0;

        // X swipesAnimtion.iconXTranslateModifier for x scale
        // X 2 for y scale like dislike translate
        if (-cardMoveOffset.diffX * swipesAnimation.iconXTranslateModifier < swipesAnimation.iconXTranslateThreshhold) {
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
        // dislike.style.opacity = `${1 + cardMoveOffset.diffX / 300}`;

        card.style.transform = `translate(${cardMoveOffset.diffX}px, ${cardMoveOffset.diffY}px)`;

        // ----->>>> CONSTANTS
        const rotationScale = 10;
        heart.style.transform += `rotate(${-cardMoveOffset.diffX / rotationScale}deg)`;
        dislike.style.transform += `rotate(${-cardMoveOffset.diffX / rotationScale}deg)`;
        card.style.transform += `rotate(${cardMoveOffset.diffX / rotationScale}deg)`;
    });
    EventBus.register('swipe:end', () => {
        const card = document.querySelectorAll<HTMLElement>('.card')[0];
        if (window.offsetX > swipesAnimation.likeXThreshhold) {
            console.log('LIKE');
            window.startX = 0;
            eventBus.dispatch('feed:like-button');
            return;
        }

        if (window.offsetX < -swipesAnimation.likeXThreshhold) {
            console.log('DISLIKE');
            window.startX = 0;
            eventBus.dispatch('feed:dislike-button');
            return;
        }
        const heart = document.querySelectorAll<HTMLElement>('img')[3];
        const dislike = document.querySelectorAll<HTMLElement>('img')[1];
        card.style.animation = 'returnToDefault 1s ease 1';
        heart.style.animation = 'returnToDefaultAction 1s ease 1';
        dislike.style.animation = 'returnToDefaultAction 1s ease 1';

        card.addEventListener('animationend', (event) => {
            const card = document.querySelectorAll<HTMLElement>('.card')[0];
            const heart = document.querySelectorAll<HTMLElement>('img')[3];
            const dislike = document.querySelectorAll<HTMLElement>('img')[1];
            dislike.style.width = `swipesAnimation.iconDefaultWidthpx`;
            dislike.style.height = `swipesAnimation.iconDefaultWidthpx`;
            dislike.style.transform = ``;
            dislike.style.opacity = `1`;
            dislike.style.animation = '';
            heart.style.width = `swipesAnimation.iconDefaultWidthpx`;
            heart.style.height = `swipesAnimation.iconDefaultWidthpx`;
            heart.style.transform = ``;
            heart.style.opacity = `1`;
            heart.style.animation = '';
            card.style.transform = '';
            card.style.animation = '';
        });
    });
};
