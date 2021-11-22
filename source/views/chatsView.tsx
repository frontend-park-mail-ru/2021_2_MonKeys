import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { CritError } from '../components/critError.js';
import { ErrorStore } from '../store/errorStore.js';
import { Tapbar } from '../components/tapbar.js';
import TapbarStore from '../store/tapbarStore.js';
import { Chats } from '../components/chats/chats.js';
import { ChatsStore } from '../store/ChatsStore.js';

export default class ChatsView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        ChatsStore.subscribe(this.chatsStoreUpdatesView, this);
        ErrorStore.subscribe(this.errorStoreUpdatesView, this);
        this._template = this._createTmpl(this._data);
    }

    public unsubscribe() {
        ChatsStore.unsubscribe(this.chatsStoreUpdatesView);
        ErrorStore.unsubscribe(this.errorStoreUpdatesView);
    }

    _data = {
        chats: ChatsStore.get().chats,
        'critError': {
            title: 'Ошибка подключения',
            text: 'Не удаётся подключиться к серверу. Проверь подключение к Интернету и попробуй снова.',
            loading: ErrorStore.get().apiErrorLoadCondition,
        },
    };

    _createTmpl(data) {
        return (
            <div class='card-container'>
                {Chats(data.chats)}
                {Tapbar(TapbarStore.get())}
                {CritError(data.critError)}
            </div>
        );
    }

    private chatsStoreUpdatesView(data, view) {
        view._data.chats = ChatsStore.get().chats;

        view._template = view._createTmpl(view._data);

        view.render();
    }

    private errorStoreUpdatesView(data, view) {
        view._data.critError.loading = data.apiErrorLoadCondition;
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
