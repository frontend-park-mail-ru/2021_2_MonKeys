import eventBus from '../../dispatcher/eventBus.js';
import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { conditionalRendering } from '../../utils/tsxTools/jsxTools.js';
import { EVENTS } from '../../dispatcher/events.js';

const LButtonProps = {
    position: 'left',
    type: 'button',
    src: 'icons/carousel_left.svg',
    onclick: () => {
        eventBus.dispatch(EVENTS.CAROUSEL_PREVIOUS);
    },
};

const RButtonProps = {
    position: 'right',
    type: 'button',
    src: 'icons/carousel_right.svg',
    onclick: () => {
        eventBus.dispatch(EVENTS.CAROUSEL_NEXT);
    },
};

const nav = (length, selectedID) => {
    const items = [];
    for (let i = 0; i < length; i++) {
        if (i === selectedID) {
            items.push(<div class='carousel-button-nav current-slide' alt='untracked'></div>);
        } else {
            items.push(<div class='carousel-button-nav' alt='untracked'></div>);
        }
    }
    return items;
};

export const CarouselButton = (props) => {
    if (!props.alt) {
        props.alt = 'untracked';
    }

    return (
        <div class={`carousel-nav__${props.position}`} onclick={props.onclick}>
            <img src={props.src} class={`carousel-button-${props.position}`} alt={props.alt} />
        </div>
    );
};

export const ImgCarousel = (props: string[], sizeClass: string, feed = false) => {
    if (!props) {
        return <img src='img/stare-dont-blink.gif' class='card-img' />;
    }
    if (!window.currentSelectedCarouselItem) {
        window.currentSelectedCarouselItem = 0;
    }

    window.currentCarouselSize = props.length - 1;

    const lastCard = window.currentCarouselSize === window.currentSelectedCarouselItem;
    const firstCard = window.currentSelectedCarouselItem === 0;

    const oneCard = window.currentCarouselSize === 0;
    if (sizeClass === 'img-card__img img-card__img_size_small') {
        return (
            <div class={sizeClass}>
                <img
                    src={props[0]}
                    class={sizeClass}
                    ondragstart={() => {
                        return false;
                    }}
                />
            </div>
        );
    }
    const feedCarouselClass = feed ? 'card__carousel-nav' : 'card-expended__carousel-nav';
    return (
        <div class={sizeClass}>
            <div class={feedCarouselClass + ' carousel-nav__arrows'}>
                {conditionalRendering(CarouselButton(LButtonProps), !firstCard)}
                {conditionalRendering(CarouselButton(RButtonProps), !lastCard)}
            </div>
            <div class='carousel-nav'>
                {conditionalRendering(nav(props.length, window.currentSelectedCarouselItem), !oneCard)}
            </div>
            <img
                src={props[window.currentSelectedCarouselItem]}
                class={sizeClass}
                ondragstart={() => {
                    return false;
                }}
            />
        </div>
    );
};
