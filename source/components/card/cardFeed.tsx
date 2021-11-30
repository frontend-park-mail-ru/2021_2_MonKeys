import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { IconButton } from '../common/iconButton.js';
import { ImgCarousel } from './imgCarousel.js';
import { ProfileData } from '../../store/profileStore.js';
import eventBus from '../../dispatcher/eventBus.js';

export interface CardFeedProps {
    userData: ProfileData;
    buttons;
}

export const CardFeed = (props: CardFeedProps) => {
    return (
        <div class='feed__card'>
            <div
                class='card'
                ontouchstart={(event) => {
                    const { touches } = event;
                    if (!window.startX) {
                        window.startX = 0;
                        window.startY = 0;
                    }
                    window.startX = touches[0].clientX;
                    window.startY = touches[0].clientY;
                    eventBus.dispatch('swipe:start');
                }}
                ontouchmove={(event) => {
                    if (!window.startX || !window.startY) {
                        return;
                    }
                    const { touches } = event;
                    let x;
                    let y;
                    if (event.touches) {
                        x = touches[0].clientX;
                        y = touches[0].clientY;
                    } else {
                        x = event.offsetX;
                        y = event.offsetY;
                    }
                    const diffX = x - window.startX;
                    const diffY = y - window.startY;
                    window.offsetX = diffX;
                    window.offsetY = diffY;
                    eventBus.dispatch('swipe:move', { diffX, diffY });
                }}
                onmousedown={(event) => {
                    if (!window.startX) {
                        window.startX = 0;
                        window.startY = 0;
                    }
                    window.startX = event.clientX;
                    window.startY = event.clientY;
                }}
                onmousemove={(event) => {
                    if (event.buttons === 1) {
                        const diffX = event.clientX - window.startX;
                        const diffY = event.clientY - window.startY;
                        window.offsetX = diffX;
                        window.offsetY = diffY;
                        eventBus.dispatch('swipe:move', { diffX, diffY });
                    }
                }}
                onmouseup={() => {
                    eventBus.dispatch('swipe:end');
                }}
                ontouchend={() => {
                    eventBus.dispatch('swipe:end');
                }}
            >
                {ImgCarousel(props.userData.imgs, 'card-img')}
                <div class='card-bottom-panel'>
                    <div class='card-bottom-panel__name'>
                        <div class='card-bottom-panel__name__name'>{props.userData.name}</div>
                        <div class='card-bottom-panel__name__age'>{props.userData.age}</div>
                    </div>
                    <div class='card-bottom-panel_actions'>
                        {Object.keys(props.buttons).map((item) => IconButton(props.buttons[item]))}
                    </div>
                </div>
            </div>
        </div>
    );
};
