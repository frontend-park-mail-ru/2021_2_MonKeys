import eventBus from '../dispatcher/eventBus.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { IconButton } from './iconButton.js';

const LButtonProps = {
    type: 'button',
    class: 'carousel-button-left',
    src: 'icons/button_previous_black.svg',
    onclick: () => {
        eventBus.dispatch('carousel:previous');
    },
};

const RButtonProps = {
    type: 'button',
    class: 'carousel-button-right',
    src: 'icons/button_next_black.svg',
    onclick: () => {
        eventBus.dispatch('carousel:next');
    },
};

const NavButtonProps = {
    type: 'button',
    class: 'carousel-button-nav',
    src: 'icons/button_selector_deselected.svg',
};

const NavButtonPropsSelected = {
    type: 'button',
    class: 'carousel-button-nav current-slide',
    src: 'icons/button_selector_deselected.svg',
};

declare global {
    interface Window {
        currentSelectedCarouselItem: number;
        currentCarouselSize: number;
    }
}

const slides = (imgSrc: string[], selectedID: number, sizeClass, carouselSizeClass) => {
    if (!imgSrc) {
        return <div>no images</div>;
    }
    const items = [];
    imgSrc.push(imgSrc[selectedID]);
    imgSrc.forEach((element) => {
        items.push(
            <li class={carouselSizeClass}>
                <img src={element} class={sizeClass} alt='' />
            </li>
        );
    });
    imgSrc.pop();
    return items;
};

const nav = (length, selectedID) => {
    const items = [];
    for (let i = 0; i < length; i++) {
        if (i === selectedID) {
            items.push(IconButton(NavButtonPropsSelected));
        } else {
            items.push(IconButton(NavButtonProps));
        }
    }
    return items;
};

const conditionalRendering = (param, bool) => {
    if (bool) {
        return param;
    }
    return <div></div>;
};

export const ImgCarousel = (props: string[], expanded: boolean) => {
    if (!props) {
        return <div>no img set</div>;
    }
    if (!window.currentSelectedCarouselItem) {
        window.currentSelectedCarouselItem = 0;
    }
    let sizeClass = 'profile-image',
        carouselSizeClass = 'carousel-slide',
        sideSizeClass = 'side-big';
    if (expanded) {
        sizeClass = 'card-el profile-image-expand';
        carouselSizeClass = 'carousel-slide-expand';
        sideSizeClass = 'side-small';
    }
    LButtonProps.class = 'carousel-button-left ' + sideSizeClass;
    RButtonProps.class = 'carousel-button-right ' + sideSizeClass;

    window.currentCarouselSize = props.length - 1;

    const lastCard = window.currentCarouselSize === window.currentSelectedCarouselItem;
    const firstCard = window.currentSelectedCarouselItem === 0;

    const oneCard = window.currentCarouselSize === 0;

    return (
        <div class={sizeClass}>
            <ul class='carousel-track'>
                <div class='carousel-track-container'>
                    {slides(props, window.currentSelectedCarouselItem, sizeClass, carouselSizeClass)}
                </div>
            </ul>
            {conditionalRendering(IconButton(LButtonProps), !firstCard)}
            {conditionalRendering(IconButton(RButtonProps), !lastCard)}
            <div class='carousel-nav'>
                {conditionalRendering(nav(props.length, window.currentSelectedCarouselItem), !oneCard)}
            </div>
        </div>
    );
};
