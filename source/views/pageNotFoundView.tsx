import ViewBase from './viewBase.js';
import { viewSizes } from '../constants/viewParams.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';

export default class PageNotFoundView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        this.viewSize = viewSizes.anyone;
    }
    _template = (
        <div>
            <img class='out-of-cards-drip-1' src='icons/drip_gradient.svg'></img>
            <img class='out-of-cards-drip-2' src='icons/drip_gradient.svg'></img>
            <img class='out-of-cards-drip-3' src='icons/drip_gradient.svg'></img>
            <h1 class='out-of-cards-sign'>Страница не найдена</h1>
        </div>
    );
}
