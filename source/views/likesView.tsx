import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Tapbar } from '../components/tapbar.js';
import { CardLikes } from '../components/cardLikes.js';
import LikesStore from '../store/likesStore.js';

export default class LikesView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        LikesStore.subscribe(this.subscribtionCallback, this);
        this._template = this._createTmpl(this._data);
    }

    _data = {
        'matchesCount': LikesStore.get().mathesCount,
        'matches': LikesStore.get().profiles,
        'tapbar': {
            class: 'menu-icon',
        },
    };

    _createTmpl(data) {
        return (
            <div class='card-container'>
                <div class='likes-count'>You have {this._data.matchesCount} matches!</div>
                {Object.keys(this._data.matches).map((item) => CardLikes(this._data.matches[item]))}
                {Tapbar(this._data.tapbar)}
            </div>
        );
    }

    public unsubscribe() {
        LikesStore.unsubscribe(this.subscribtionCallback);
    }

    private subscribtionCallback(data, view) {
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
