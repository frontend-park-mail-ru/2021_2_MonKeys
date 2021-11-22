import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { CritError } from '../components/critError.js';
import { ErrorStore } from '../store/errorStore.js';
import { Tapbar } from '../components/tapbar.js';
import { MatchesStore } from '../store/matchStore.js';
import TapbarStore from '../store/tapbarStore.js';
import { Chats } from '../components/chats/chats.js';
import { ChatsStore } from '../store/ChatsStore.js';
import { SearchField } from '../components/searchField.js';

export default class ChatsView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        ChatsStore.subscribe(this.chatsStoreUpdatesView, this);
        ErrorStore.subscribe(this.errorStoreUpdatesView, this);
        MatchesStore.subscribe(this.subscribtionCallback, this);

        this._template = this._createTmpl(this._data);
    }

    public unsubscribe() {
        ChatsStore.unsubscribe(this.chatsStoreUpdatesView);
        ErrorStore.unsubscribe(this.errorStoreUpdatesView);
        MatchesStore.unsubscribe(this.subscribtionCallback);
    }

    _data = {
        chats: ChatsStore.get().chats,
        'critError': {
            title: 'Ошибка подключения',
            text: 'Не удаётся подключиться к серверу. Проверь подключение к Интернету и попробуй снова.',
            loading: ErrorStore.get().apiErrorLoadCondition,
        },

        'matches': MatchesStore.get().matches,
        'matchesSearched': MatchesStore.get().matchesSearched,
        'tapbar': {
            class: 'menu-icon',
        },
    };

    _createTmpl(data) {
        return (
            <div class='view-contant'>
                {SearchField()}
                <div class='view-contant__matches-header'>Ваши пары</div>
                <div class='view-contant__matches-profiles'>
                    {Object.keys(data.matches).map((item) => {
                        return (
                            <div class='view-contant__match-profile'>
                                <img class='view-contant__match-img' src={data.matches[item].imgs[0]} />
                            </div>
                        );
                    })}
                </div>
                {Chats(data.chat)}
                {/* {CritError(data.critError)} */}
                {Tapbar(TapbarStore.get())}
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

    private subscribtionCallback(data, view) {
        view._data.matches = data.matches;
        view._data.matchesSearched = data.matchesSearched;
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
