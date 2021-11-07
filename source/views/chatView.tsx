import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Tapbar } from '../components/tapbar.js';
import TapbarStore from '../store/tapbarStore.js';

export default class ChatView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
    }
    _template = (
        <div class='card-container'>
            чат
            {Tapbar(TapbarStore.get())}
        </div>
    );
}
