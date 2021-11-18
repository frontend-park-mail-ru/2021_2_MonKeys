import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Tapbar } from '../components/tapbar.js';
import { ImgCard } from '../components/imgCard.js';
import LikesStore from '../store/likesStore.js';
import TapbarStore from '../store/tapbarStore.js';
import eventBus from '../dispatcher/eventBus.js';
import { CardExpended } from '../components/cardExpended.js';

export default class LikesView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        LikesStore.subscribe(this.subscribtionCallback, this);
        this._template = this._createTmpl(this._data);
    }

    _data = {
        'likesCount': LikesStore.get().likesCount,
        'likes': LikesStore.get().profiles,
    };

    _createTmpl(data) {
        if (!LikesStore.get().expended) {
            return (
                <div class='likes-view-contant'>
                    <div class='likes-view-header'>Вы понравились нескольким людям</div>
                    <div class='likes-view-cards'>
                        {Object.keys(data.likes).map((item) =>
                            ImgCard({ userData: data.likes[item], size: 'small', expanded: true })
                        )}
                    </div>
                    {Tapbar(TapbarStore.get())}
                </div>
            );
        } else {
            return (
                <div class='likes-view-contant likes-view-contant_align_center'>
                    {CardExpended({ userData: data.likes[LikesStore.get().userIndex], withActions: true })}
                    {Tapbar(TapbarStore.get())}
                </div>
            );
        }
    }

    public unsubscribe() {
        LikesStore.unsubscribe(this.subscribtionCallback);
    }

    private subscribtionCallback(data, view) {
        view._data.likes = data.profiles;
        view._data.likesCount = data.likesCount;
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
