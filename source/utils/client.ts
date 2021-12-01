import { throttle } from './throttle.js';
import { viewSizes } from '../constants/viewParams.js';
import router from '../route/router.js';

declare global {
    interface Window {
        isWidescreen: boolean;
    }
}

const aspectRatioWidesceenEdge = 1;
const defaultDelay = 100;

export const startClientAspectRatio = () => {
    window.isWidescreen = window.innerWidth / window.innerHeight > aspectRatioWidesceenEdge;
};

const wideMinWidth = 400;

const detectPC = (aspectRatio, width: number) => {
    return aspectRatio > aspectRatioWidesceenEdge && width > wideMinWidth;
};

export const getClientAspectRatio = (width: number, height: number) => {
    const aspectRatio = width / height;

    if (window.isWidescreen != detectPC(aspectRatio, width)) {
        window.isWidescreen = !window.isWidescreen;
        if (window.currentView) {
            if (window.currentView.viewSize === viewSizes.anyone) {
                return;
            }
            if (window.currentView.viewSize === viewSizes.slim && window.isWidescreen) {
                router.go(window.location.pathname);
            } else if (window.currentView.viewSize === viewSizes.wide && !window.isWidescreen) {
                router.go(window.location.pathname);
            }
        }
    }
};

export const isWidescreen = throttle((event) => {
    getClientAspectRatio(event.target.innerWidth, event.target.innerHeight);
}, defaultDelay);
