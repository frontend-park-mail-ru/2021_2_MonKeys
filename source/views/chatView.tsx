import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Tapbar } from '../components/tapbar.js';

export default class ChatView extends ViewBase {
    _data = {
        'tapbar': {
            class: 'menu-chat',
        },
    };
    _template = (
        <div>
            чатик)
            {Tapbar(this._data.tapbar)}
        </div>
    );
}
