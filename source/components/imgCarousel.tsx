import eventBus from '../dispatcher/eventBus.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { IconButton } from './iconButton.js';
import { conditionalRendering } from '../tools/jsxTools.js';

const LButtonProps = {
    type: 'button',
    class: 'carousel-button-left',
    src: 'icons/carousel_left.svg',
    onclick: () => {
        eventBus.dispatch('carousel:previous');
    },
};

const RButtonProps = {
    type: 'button',
    class: 'carousel-button-right',
    src: 'icons/carousel_right.svg',
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
    imgSrc.forEach((element) => {
        items.push(<img src={element} class='card__img' alt='' />);
    });
    imgSrc.pop();
    return items;
};

const nav = (length, selectedID) => {
    const items = [];
    for (let i = 0; i < length; i++) {
        if (i === selectedID) {
            items.push(
            <div 
                class="carousel-button-nav current-slide" 
                alt="untracked"> 
            </div>
            );
        } else {
            items.push(
                <div 
                class="carousel-button-nav" 
                alt="untracked"> 
                </div>
            );
        }
    }
    return items;
};

export const ImgCarousel = (props: string[], expanded: boolean) => {
    if (!props) {
        return <img src='img/stare-dont-blink.gif' class='card-img' />;
    }
    if (!window.currentSelectedCarouselItem) {
        window.currentSelectedCarouselItem = 0;
    }
    let sizeClass = 'img-card__img',
        carouselSizeClass = 'carousel-slide',
        sideSizeClass = 'side-big';
    if (expanded) {
        sizeClass = 'card-el img-card__img-expand';
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
        <div class='card-img'>
            {<img src={props[window.currentSelectedCarouselItem]} class='card__img' alt='' />}
            {conditionalRendering(IconButton(LButtonProps), !firstCard)}
            {conditionalRendering(IconButton(RButtonProps), !lastCard)}
            <div class='carousel-nav'>
                {conditionalRendering(nav(props.length, window.currentSelectedCarouselItem), !oneCard)}
            </div>
        </div>
    );
};
