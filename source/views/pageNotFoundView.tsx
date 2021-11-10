import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';

export default class PageNotFoundView extends ViewBase {
    _template = (
        <div>
            <img class='out-of-cards-drip-1' src='icons/drip.svg'></img>
            <img class='out-of-cards-drip-2' src='icons/drip.svg'></img>
            <img class='out-of-cards-drip-3' src='icons/drip.svg'></img>
            <h1 class='out-of-cards-sign'>Страница не найдена</h1>
        </div>
    );
}
