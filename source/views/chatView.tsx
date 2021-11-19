import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Chat } from '../components/chat/chat.js';
import { CritError } from '../components/critError.js';
import { ChatStore } from '../store/chatStore.js';
import { ErrorStore } from '../store/errorStore.js';

export default class ChatView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        ChatStore.subscribe(this.chatStoreUpdatesView, this);
        ErrorStore.subscribe(this.errorStoreUpdatesView, this);
        this._template = this._createTmpl(this._data);
    }

    public unsubscribe() {
        ChatStore.unsubscribe(this.chatStoreUpdatesView);
        ErrorStore.unsubscribe(this.errorStoreUpdatesView);
    }

    _data = {
        'chat': {
            header: {
                username: ChatStore.get().chatName,
            },
            messages: ChatStore.get().messages,
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
                {Chat(data.chat)}
                {CritError(data.critError)}
            </div>
        );
    }

    private chatStoreUpdatesView(data, view) {
        view._data.chat.messages = ChatStore.get().messages;

        view._template = view._createTmpl(view._data);

        view.render();
    }

    private errorStoreUpdatesView(data, view) {
        view._data.critError.loading = data.apiErrorLoadCondition;
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
