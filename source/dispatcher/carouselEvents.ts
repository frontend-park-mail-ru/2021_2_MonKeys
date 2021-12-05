import EventBus from './eventBus.js';
import { EVENTS } from './events.js';

export const CarouselEventsRegister = () => {
    EventBus.register(EVENTS.CAROUSEL_NEXT, () => {
        if (window.currentSelectedCarouselItem < window.currentCarouselSize) {
            window.currentSelectedCarouselItem++;
        }

        window.currentView.forceRender();
    });
    EventBus.register(EVENTS.CAROUSEL_PREVIOUS, () => {
        if (window.currentSelectedCarouselItem > 0) {
            window.currentSelectedCarouselItem--;
        }

        window.currentView.forceRender();
    });
};
