import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Chat } from '../components/chat/chat.js';
import { errorManager, ErrorStore } from '../store/errorStore.js';
import { ChatsStore, chatsManager } from '../store/chatsStore.js';
import ReportsStore from '../store/reportsStore.js';
import { CardExpended } from '../components/cardExpended.js';
import { Errors } from '../components/error/Errors.js';

export default class ChatView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        ChatsStore.subscribe(this.chatUpdatesView, this);
        ReportsStore.subscribe(this.reportsSubscribtionCallback, this);
        ErrorStore.subscribe(this.errorStoreUpdatesView, this);
        this._template = this._createTmpl(this._data);
        console.log(chatsManager.chat);
    }

    public unsubscribe() {
        ChatsStore.unsubscribe(this.chatUpdatesView);
        ReportsStore.unsubscribe(this.reportsSubscribtionCallback);
        ErrorStore.unsubscribe(this.errorStoreUpdatesView);
    }

    _data = {
        chat: chatsManager.chat,
        reports: ReportsStore.get().reports,
        reportsActive: ReportsStore.get().active,
        error: errorManager.error,
    };

    _createTmpl(data) {
        return (
            <div class=''>
                {CardExpended({
                    userData: data.profile,
                    withActions: false,
                    withReports: true,
                    reports: data.reports,
                    reported: data.reportsActive,
                })}
                {Chat(data.chat)}
                {Errors(data.error)}
            </div>
        );
    }

    private chatUpdatesView(data, view) {
        view._data.chat = chatsManager.chat;

        view._template = view._createTmpl(view._data);

        view.render();

        const _chatSpace = document.getElementsByClassName('view-contant__message-space')[0];
        _chatSpace.scrollTop = _chatSpace.scrollHeight;
        const _inputMsg = document.getElementsByTagName('input')[0];
        _inputMsg.focus();
    }

    private reportsSubscribtionCallback(data, view) {
        view._data.reports = data.reports;
        view._data.reportsActive = data.active;
        view._template = view._createTmpl(view._data);
        view.render();
    }

    private errorStoreUpdatesView(data, view) {
        view._data.error = errorManager.error;
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
