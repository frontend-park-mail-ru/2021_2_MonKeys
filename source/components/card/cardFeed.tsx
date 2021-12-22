import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { IconButton } from '../common/iconButton.js';
import { ImgCarousel } from './imgCarousel.js';
import { ProfileData } from '../../store/profileStore.js';
import eventBus from '../../dispatcher/eventBus.js';
import { EVENTS } from '../../dispatcher/events.js';
import { conditionalRendering } from '../../utils/tsxTools/jsxTools.js';

export interface CardFeedProps {
    userData: ProfileData;
    buttons;
}

export const CardFeed = (props: CardFeedProps, wide: boolean) => {
    const mainClass = wide ? 'card-wide' : 'feed__card';
    return (
        <div class={mainClass}>
            <div style='height: 100%;'>
                <div></div>
                <div style='height: 100%'>
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
                            eventBus.dispatch(EVENTS.SWIPE_START);
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
                            eventBus.dispatch(EVENTS.SWIPE_MOVE, { diffX, diffY });
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
                                eventBus.dispatch(EVENTS.SWIPE_MOVE, { diffX, diffY });
                            }
                        }}
                        onmouseup={() => {
                            eventBus.dispatch(EVENTS.SWIPE_END);
                        }}
                        ontouchend={() => {
                            eventBus.dispatch(EVENTS.SWIPE_END);
                        }}
                    >
                        {ImgCarousel(props.userData.imgs, 'img-card__img img-card__img_size_medium')}
                        <div class='card-bottom-panel'>
                            <div class='card-bottom-panel__name'>
                                <div class='card-bottom-panel__name__name'>{props.userData.name}</div>
                                <div class='card-bottom-panel__name__age'>{props.userData.age}</div>
                                {conditionalRendering(
                                    <div class={'img-card__report-status'}>
                                        <span class={'img-card__report-text'}>{props.userData.reportStatus}</span>
                                    </div>,
                                    props.userData.reportStatus
                                )}
                            </div>
                            <div class='card-bottom-panel_actions'>
                                {Object.keys(props.buttons).map((item) => IconButton(props.buttons[item]))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
