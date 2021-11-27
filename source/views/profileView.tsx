import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Tapbar } from '../components/tapbar/tapbar.js';
import { CardExpended } from '../components/cardExpended.js';
import { ProfileStore } from '../store/profileStore.js';
import EventBus from '../dispatcher/eventBus.js';
import TapbarStore from '../store/tapbarStore.js';
import { ErrorStore } from '../store/errorStore.js';

export default class ProfileView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);

        ProfileStore.subscribe(this.subcribtionCallback, this);
        ErrorStore.subscribe(this.errorStoreUpdatesView, this);
        this._template = this._createTmpl(this._data);
    }

    _data = {
        'cardData': {
            'userData': {
                name: ProfileStore.get().name,
                age: ProfileStore.get().age,
                description: ProfileStore.get().description,
                imgs: ProfileStore.get().imgs,
                tags: ProfileStore.get().tags,
            },
            'settingButtons': {
                onclick: () => {
                    EventBus.dispatch<string>('profile:edit-button');
                },
            },
        },
        'tapbar': {
            class: 'menu-icon',
        },
        'critError': {
            title: 'Ошибка подключения',
            text: 'Не удаётся подключиться к серверу. Проверь подключение к Интернету и попробуй снова.',
            loading: ErrorStore.get().apiErrorLoadCondition,
        },
    };

    _createTmpl(data) {
        return (
            <div class='view-contant view-contant_align_center'>
                <div class='view-contant__icon-button'>
                    <img
                        src='icons/settings.svg'
                        class='view-contant__dislike'
                        onclick={data.cardData.settingButtons.onclick}
                    />
                </div>
                {CardExpended({ userData: data.cardData.userData, withActions: false, withReports: false })}
                {Tapbar(TapbarStore.get())}
                {/* {Error(data.critError)} */}
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
        view._data.critError.loading = data.apiErrorLoadCondition;
        view._template = view._createTmpl(view._data);
        view.render();
    }

    private errorStoreUpdatesView(data, view) {
        view._data.critError.loading = data.apiErrorLoadCondition;
        view._template = view._createTmpl(view._data);
        view.render();
    }

    public forceRender() {
        ProfileStore.subscribe(this.subcribtionCallback, this);
        this._template = this._createTmpl(this._data);
        this.render();
    }
}
