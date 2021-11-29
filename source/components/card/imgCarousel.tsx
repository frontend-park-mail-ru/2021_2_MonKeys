import eventBus from '../../dispatcher/eventBus.js';
import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { IconButton } from '../common/iconButton.js';
import { conditionalRendering } from '../../utils/tsxTools/jsxTools.js';

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

export const ImgCarousel = (props: string[], sizeClass: string) => {
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
                {
                    <img
                        src={props[0]}
                        class={sizeClass}
                        ondragstart={() => {
                            return false;
                        }}
                        alt=''
                    />
                }
            </div>
        );
    }
    return (
        <div class={sizeClass}>
            {
                <img
                    src={props[window.currentSelectedCarouselItem]}
                    class={sizeClass}
                    ondragstart={() => {
                        return false;
                    }}
                    alt=''
                />
            }
            <div class='carousel-nav__arrows'>
                {conditionalRendering(IconButton(LButtonProps), !firstCard)}
                {conditionalRendering(IconButton(RButtonProps), !lastCard)}
            </div>
            <div class='carousel-nav'>
                {conditionalRendering(nav(props.length, window.currentSelectedCarouselItem), !oneCard)}
            </div>
        </div>
    );
};
