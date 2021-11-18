import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Tapbar } from '../components/tapbar.js';
import { CardExpended } from '../components/cardExpended.js';
import { ProfileStore } from '../store/profileStore.js';
import EventBus from '../dispatcher/eventBus.js';
import { CritError } from '../components/critError.js';
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
            'tags': ProfileStore.get().tags,
            'buttons': {
                'logoutButton': {
                    type: 'button',
                    src: 'icons/button_previous_white.svg',
                    class: 'menu-icon',
                    onclick: () => {
                        EventBus.dispatch<string>('profile:logout-button');
                    },
                },
                'editButton': {
                    type: 'button',
                    src: 'icons/button_edit_white.svg',
                    class: 'menu-icon',
                    onclick: () => {
                        EventBus.dispatch<string>('profile:edit-button');
                    },
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
            <div class='card-container'>
                {CardExpended({ userData: data.cardData.userData, withActions: false })}
                {Tapbar(TapbarStore.get())}
                {CritError(data.critError)}
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
        view._data.cardData.tags = data.tags;
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
