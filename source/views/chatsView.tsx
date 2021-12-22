import ViewBase from './viewBase.js';
import { viewSizes } from '../constants/viewParams.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { errorManager, ErrorStore } from '../store/errorStore.js';
import { Tapbar } from '../components/tapbar/tapbar.js';
import { MatchesStore } from '../store/matchStore.js';
import TapbarStore from '../store/tapbarStore.js';
import { Chats } from '../components/chats/chats.js';
import { ChatsStore, chatsManager } from '../store/chatsStore.js';
import { SearchField } from '../components/common/searchField.js';
import { matchRequest } from '../requests/matchRequest.js';
import { Errors } from '../components/error/errors.js';
import { Matches } from '../components/chats/matches.js';

export default class ChatsView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        this.viewSize = viewSizes.slim;
        ChatsStore.subscribe(this.chatsStoreUpdatesView, this);
        ErrorStore.subscribe(this.errorStoreUpdatesView, this);
        MatchesStore.subscribe(this.subscribtionCallback, this);

        this._template = this._createTmpl(this._data);

        matchRequest().then((data) => {
            const matchesData = MatchesStore.get();
            matchesData.matches = data.body.allUsers;
            for (const key in matchesData.matches) {
                matchesData.matches[key].isNew = true;
            }
            const chatsData = ChatsStore.get();
            for (let i = 0; i < chatsData.chats.length; i++) {
                for (const key in matchesData.matches) {
                    if (matchesData.matches[key].id === chatsData.chats[i].fromUserID) {
                        matchesData.matches[key].isNew = false;
                    }
                }
            }
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
        matches: MatchesStore.get().matches,
        matchesSearched: MatchesStore.get().matchesSearched,
    };

    _createTmpl(data) {
        if (!data.matches[0] && !data.chats[0]) {
            return (
                <div class='view-contant view-contant_align_center view-content_scroll-banned'>
                    <div
                        class='view-contant view-contant_align_center
                  view-content_scroll-banned view-content__max-height'
                    >
                        <div class='likes-view-text-big'>Здесь будут ваши пары и чаты</div>

                        <div class='view-content__dummy-image-container'>
                            <img src='icons/chat_gradient.svg' class='view-content__dummy-image'></img>
                        </div>
                        <div class='likes-view-text-small'>Лайкайте карточки в ленте и возвращайтесь</div>

                        {Tapbar(TapbarStore.get())}
                        {Errors(data.error)}
                    </div>
                </div>
            );
        }
        return (
            <div class='app__content--align-center'>
                <div class='chats'>
                    {SearchField()}
                    {Matches(data.matches)}
                    {Chats(data.chats)}
                    <div class='chats__tapbar'>{Tapbar(TapbarStore.get())}</div>
                    {Errors(data.error)}
                </div>
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
