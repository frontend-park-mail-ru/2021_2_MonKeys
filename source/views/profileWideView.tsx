/* eslint-disable max-len */
import ViewBase from './viewBase.js';
import { viewSizes } from '../constants/viewParams.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Tapbar } from '../components/tapbar/tapbar.js';
import { CardExpended } from '../components/card/cardExpended.js';
import { ProfileStore } from '../store/profileStore.js';
import TapbarStore from '../store/tapbarStore.js';
import { errorManager, ErrorStore } from '../store/errorStore.js';
import { Errors } from '../components/error/errors.js';

export default class ProfileWideView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        this.viewSize = viewSizes.wide;

        ProfileStore.subscribe(this.subcribtionCallback, this);
        ErrorStore.subscribe(this.errorStoreUpdatesView, this);
        this._template = this._createTmpl(this._data);
    }

    _data = {
        cardData: {
            'userData': {
                name: ProfileStore.get().name,
                age: ProfileStore.get().age,
                description: ProfileStore.get().description,
                imgs: ProfileStore.get().imgs,
                tags: ProfileStore.get().tags,
            },
        },
        tapbar: {
            class: 'menu-icon',
        },
        error: errorManager.error,
    };

    _createTmpl(data) {
        return (
            <div class='flex-full'>
                {Tapbar(TapbarStore.get(), true)}
                <div class='flex-wide-view-center'>
                    <div class='flex-wide-feed'>
                        <div class='profile'>
                            <div class='profile__card'>
                                {CardExpended({
                                    userData: data.cardData.userData,
                                    withActions: false,
                                    withReports: false,
                                })}
                            </div>
                            {Errors(data.error)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    public unsubscribe() {
        ProfileStore.unsubscribe(this.subcribtionCallback);
        ErrorStore.unsubscribe(this.errorStoreUpdatesView);
    }

    private subcribtionCallback(data, view) {
        view._data.cardData.userData.name = data.name;
        view._data.cardData.userData.age = data.age;
        view._data.cardData.userData.description = data.description;
        view._template = view._createTmpl(view._data);
        view.render();
    }

    private errorStoreUpdatesView(data, view) {
        view._data.error = errorManager.error;
        view._template = view._createTmpl(view._data);
        view.render();
    }

    public forceRender() {
        ProfileStore.subscribe(this.subcribtionCallback, this);
        this._template = this._createTmpl(this._data);
        this.render();
    }
}
