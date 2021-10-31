import EventBus from './eventBus.js';

export const CarouselEventsRegister = () => {
    EventBus.register('carousel:next', () => {
        if (window.currentSelectedCarouselItem < window.currentCarouselSize) {
            window.currentSelectedCarouselItem++;
        }

        window.currentView.forceRender();
    });
    EventBus.register('carousel:previous', () => {
        if (window.currentSelectedCarouselItem > 0) {
            window.currentSelectedCarouselItem--;
        }

        window.currentView.forceRender();
    });
};
