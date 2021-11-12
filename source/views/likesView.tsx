import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Tapbar } from '../components/tapbar.js';
import { CardLikes } from '../components/cardLikes.js';
import LikesStore from '../store/likesStore.js';
import TapbarStore from '../store/tapbarStore.js';

export default class LikesView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);

        LikesStore.subscribe(this.subscribtionCallback, this);
        this._template = this._createTmpl(this._data);
    }

    _data = {
        'matchesCount': LikesStore.get().mathesCount,
        'matches': LikesStore.get().profiles,
    };

    _createTmpl(data) {
        return (
            <div class='card-container'>
                <div class='edit-form'>
                    <div class='likes-count'>You have {this._data.matchesCount} matches!</div>
                    {Object.keys(this._data.matches).map((item) => CardLikes(this._data.matches[item]))}
                </div>
                {Tapbar(TapbarStore.get())}
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
