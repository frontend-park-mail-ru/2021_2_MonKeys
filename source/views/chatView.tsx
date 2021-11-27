import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Chat } from '../components/chat/chat.js';
import { errorManager, ErrorStore } from '../store/errorStore.js';
import { ChatsStore, chatsManager } from '../store/chatsStore.js';
import { Errors } from '../components/error/Errors.js';

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
        error: errorManager.error,
    };

    _createTmpl(data) {
        return (
            <div class=''>
                {Chat(data.chat)}
                {Errors(data.error)}
            </div>
        );
    }

    private chatUpdatesView(data, view) {
        view._data.chat = chatsManager.chat;

        view._template = view._createTmpl(view._data);

        view.render();
    }

    private errorStoreUpdatesView(data, view) {
        view._data.error = errorManager.error;
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
