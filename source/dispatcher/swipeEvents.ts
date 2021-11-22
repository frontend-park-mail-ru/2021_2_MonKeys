import eventBus from './eventBus.js';
import EventBus from './eventBus.js';

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

        // X 0.5 for x scale
        // X 2 for y scale like dislike translate
        if (-cardMoveOffset.diffX * 0.5 > -25) {
            heartTranslateX = -cardMoveOffset.diffX * 0.5;
        } else {
            heartTranslateX = -25;
        }
        if (-cardMoveOffset.diffX * 2 > -180) {
            heartTranslateY = -cardMoveOffset.diffX * 2;
        } else {
            heartTranslateY = -180;
        }

        heart.style.transform = `translate(${heartTranslateX - cardMoveOffset.diffX}px, ${
            heartTranslateY - cardMoveOffset.diffY
        }px)`;
        heart.style.width = `${Math.round(36 + cardMoveOffset.diffX / 2)}px`;
        heart.style.height = `${Math.round(36 + cardMoveOffset.diffX / 2)}px`;
        // heart.style.opacity = `${1 - cardMoveOffset.diffX / 300}`;

        const dislike = document.querySelectorAll<HTMLElement>('img')[1];

        let dislikeTranslateX = 0;
        let dislikeTranslateY = 0;

        // X 0.5 for x scale
        // X 2 for y scale like dislike translate
        if (-cardMoveOffset.diffX * 0.5 < 25) {
            dislikeTranslateX = -cardMoveOffset.diffX * 0.5;
        } else {
            dislikeTranslateX = 25;
        }
        if (cardMoveOffset.diffX * 2 > -180) {
            dislikeTranslateY = cardMoveOffset.diffX * 2;
        } else {
            dislikeTranslateY = -180;
        }

        dislike.style.transform = `translate(${dislikeTranslateX - cardMoveOffset.diffX}px, ${
            dislikeTranslateY - cardMoveOffset.diffY
        }px)`;
        dislike.style.width = `${Math.round(36 - cardMoveOffset.diffX / 2)}px`;
        dislike.style.height = `${Math.round(36 - cardMoveOffset.diffX / 2)}px`;
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
        if (window.offsetX > 200) {
            console.log('LIKE');
            window.startX = 0;
            eventBus.dispatch('feed:like-button');
            return;
        }

        if (window.offsetX < -200) {
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
            card.style.transform = '';
            card.style.animation = '';
        });
    });
};
