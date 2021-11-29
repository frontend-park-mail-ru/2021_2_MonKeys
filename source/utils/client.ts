import { throttle } from './throttle.js';

declare global {
    interface Window {
        isWidescreen: boolean;
    }
}

const aspectRatioWidesceenEdge = 1;
const defaultDelay = 5000;

export const isWidescreen = throttle((event) => {
    const aspectRatio = event.target.innerWidth / event.target.innerHeight;
    window.isWidescreen = aspectRatio > aspectRatioWidesceenEdge;

    console.log(aspectRatio > aspectRatioWidesceenEdge);
}, defaultDelay);
