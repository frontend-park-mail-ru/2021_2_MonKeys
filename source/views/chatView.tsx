import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Chat } from '../components/chat/chat.js';
import { ErrorStore } from '../store/errorStore.js';
import { ChatsStore, chatsManager } from '../store/chatsStore.js';

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
        chat: chatsManager.chat,
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
                {/*{Error(data.critError)}*/}
            </div>
        );
    }

    private chatUpdatesView(data, view) {
        view._data.chat = chatsManager.chat;
        console.log(chatsManager.chat)
        console.log('tyt')

        view._template = view._createTmpl(view._data);

        view.render();
    }

    private errorStoreUpdatesView(data, view) {
        view._data.critError.loading = data.apiErrorLoadCondition;
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
