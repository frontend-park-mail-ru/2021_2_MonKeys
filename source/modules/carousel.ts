declare global {
    interface Window {
        currentSelectedCarouselItem: number;
        currentCarouselSize: number;
    }
}

export const resetCarousel = () => {
    window.currentSelectedCarouselItem = 0;
    window.startX = null;
    window.startY = null;
    window.offsetX = null;
    window.offsetY = null;
};
