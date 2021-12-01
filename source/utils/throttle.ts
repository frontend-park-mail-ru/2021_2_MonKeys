/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type ThrottledFunction<T extends (...args: any) => any> = (...args: Parameters<T>) => ReturnType<T>;

export function throttle<T extends (...args: any) => any>(func: T, limit: number): ThrottledFunction<T> {
    let inThrottle: boolean;
    let lastArgs;
    let lastContext;

    return function (this: any): ReturnType<T> {
        if (inThrottle) {
            lastArgs = arguments;
            lastContext = this;
            return;
        }

        func.apply(this, arguments);

        inThrottle = true;

        setTimeout(() => {
            inThrottle = false;
            if (lastArgs) {
                func.apply(lastContext, lastArgs);
            }
        }, limit);
        return;
    };
}
