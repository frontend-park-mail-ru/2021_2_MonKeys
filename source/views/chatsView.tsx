import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { errorManager, ErrorStore } from '../store/errorStore.js';
import { Tapbar } from '../components/tapbar/tapbar.js';
import { MatchesStore } from '../store/matchStore.js';
import TapbarStore from '../store/tapbarStore.js';
import { Chats } from '../components/chats/chats.js';
import { ChatsStore, chatsManager } from '../store/chatsStore.js';
import { SearchField } from '../components/searchField.js';
import { MatchProfile } from '../components/chats/matchProfile.js';
import { matchRequest } from '../requests/matchRequest.js';
import { Errors } from '../components/error/errors.js';

export default class ChatsView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        ChatsStore.subscribe(this.chatsStoreUpdatesView, this);
        ErrorStore.subscribe(this.errorStoreUpdatesView, this);
        MatchesStore.subscribe(this.subscribtionCallback, this);

        this._template = this._createTmpl(this._data);

        matchRequest().then((data) => {
            const matchesData = MatchesStore.get();
            matchesData.matches = data.body.allUsers;
            matchesData.matchesTotal = data.body.matchesCount;
            MatchesStore.set(matchesData);
        });
    }

    public unsubscribe() {
        ChatsStore.unsubscribe(this.chatsStoreUpdatesView);
        ErrorStore.unsubscribe(this.errorStoreUpdatesView);
        MatchesStore.unsubscribe(this.subscribtionCallback);
    }

    _data = {
        chats: chatsManager.chatsWithMessages,
        error: errorManager.error,

        'matches': MatchesStore.get().matches,
        'matchesSearched': MatchesStore.get().matchesSearched,
    };

    _createTmpl(data) {
        return (
            <div class='view-contant'>
                {SearchField()}
                <div class='view-contant__matches-header'>Ваши пары</div>
                <div class='view-contant__matches-profiles'>
                    {Object.keys(data.matches).map((item) => MatchProfile({ userData: data.matches[item] }))}
                </div>
                <span class='view-contant__chats-header'>Чаты</span>
                {Chats(data.chats)}
                {Errors(data.error)}
                {Tapbar(TapbarStore.get())}
            </div>
        );
    }

    private chatsStoreUpdatesView(data, view) {
        view._data.chats = chatsManager.chatsWithMessages;

        view._template = view._createTmpl(view._data);

        view.render();
    }

    private errorStoreUpdatesView(data, view) {
        view._data.error = errorManager.error;
        view._template = view._createTmpl(view._data);
        view.render();
    }

    private subscribtionCallback(data, view) {
        view._data.matches = data.matches;
        view._data.matchesSearched = data.matchesSearched;
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
