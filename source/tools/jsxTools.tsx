import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';

export function conditionalRendering(param, bool) {
    if (bool) {
        return param;
    }
    return <div style="visibility: hidden;">dsds</div>;
}
