import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';

export function conditionalRendering(param, bool) {
    if (bool) {
        return param;
    }
    return <div>dsds</div>;
}
