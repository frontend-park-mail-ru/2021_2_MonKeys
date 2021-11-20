import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Chat } from '../components/chat/chat.js';
import { CritError } from '../components/critError.js';
import { ErrorStore } from '../store/errorStore.js';
import { ChatsStore, getChatByID } from '../store/ChatsStore.js';

export default class ChatView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        ChatsStore.subscribe(this.chatUpdatesView, this);
        ErrorStore.subscribe(this.errorStoreUpdatesView, this);
        this._template = this._createTmpl(this._data);
    }

    public unsubscribe() {
        ChatsStore.unsubscribe(this.chatUpdatesView);
        ErrorStore.unsubscribe(this.errorStoreUpdatesView);
    }

    _data = {
        chat: getChatByID('2'),
        critError: {
            title: 'Ошибка подключения',
            text: 'Не удаётся подключиться к серверу. Проверь подключение к Интернету и попробуй снова.',
            loading: ErrorStore.get().apiErrorLoadCondition,
        },
    };

    _createTmpl(data) {
        return (
            <div class=''>
                {Chat(data.chat)}
                {CritError(data.critError)}
            </div>
        );
    }

    private chatUpdatesView(data, view) {
        view._data.chat = getChatByID('2');

        view._template = view._createTmpl(view._data);

        view.render();
    }

    private errorStoreUpdatesView(data, view) {
        view._data.critError.loading = data.apiErrorLoadCondition;
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
