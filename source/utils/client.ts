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

export const getClientAspectRatio = (width: number, height: number) => {
    const aspectRatio = width / height;

    if (window.isWidescreen != aspectRatio > aspectRatioWidesceenEdge) {
        window.isWidescreen = !window.isWidescreen;
        if (window.currentView) {
            console.log(window.currentView.viewSize);
            if (window.currentView.viewSize === viewSizes.anyone) {
                console.log('1');
                return;
            }
            if (window.currentView.viewSize === viewSizes.slim && window.isWidescreen) {
                console.log('redrawing to big');
                router.go(window.location.pathname);
            } else if (window.currentView.viewSize === viewSizes.wide && !window.isWidescreen) {
                console.log('redrawing to small');
                router.go(window.location.pathname);
            }
        }
    }
};

export const isWidescreen = throttle((event) => {
    getClientAspectRatio(event.target.innerWidth, event.target.innerHeight);
}, defaultDelay);
