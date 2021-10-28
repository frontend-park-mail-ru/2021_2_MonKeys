import EventBus from './eventBus.js';

export const CarouselEventsRegister = () => {
    EventBus.register('carousel:next', () => {
        console.log('next');
        if (window.currentSelectedCarouselItem < window.currentCarouselSize) {
            window.currentSelectedCarouselItem++;
        }
        console.log(window.currentView);
        window.currentView.forceRender();
    });
    EventBus.register('carousel:previous', () => {
        console.log('previous');
        if (window.currentSelectedCarouselItem > 0) {
            window.currentSelectedCarouselItem--;
        }
        console.log(window.currentSelectedCarouselItem);
        console.log(window.currentCarouselSize);
        window.currentView.forceRender();
    });
};
