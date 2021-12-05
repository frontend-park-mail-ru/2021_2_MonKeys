/* eslint-disable max-len */
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
import { CardExpended } from '../components/card/cardExpended.js';
import { Chat } from '../components/chat/chat.js';
import ReportsStore from '../store/reportsStore.js';

export default class ChatsWideView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        this.viewSize = viewSizes.wide;
        ChatsStore.subscribe(this.chatsStoreUpdatesView, this);
        ErrorStore.subscribe(this.errorStoreUpdatesView, this);
        MatchesStore.subscribe(this.subscribtionCallback, this);
        ReportsStore.subscribe(this.reportsSubscribtionCallback, this);

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
        ReportsStore.unsubscribe(this.reportsSubscribtionCallback);
    }

    _data = {
        chats: chatsManager.chatsWithMessages,
        error: errorManager.error,
        matches: MatchesStore.get().matches,
        matchesSearched: MatchesStore.get().matchesSearched,
        chat: chatsManager.chat,
        reports: ReportsStore.get().reports,
        reportsActive: ReportsStore.get().active,
    };

    _createTmpl(data) {
        let profile = <div></div>;
        if (data.chat && data.chat.profile && data.chat.isOpenedProfile) {
            profile = (
                <div>
                    {CardExpended({
                        userData: data.chat.profile,
                        withActions: false,
                        withReports: true,
                        withBackButton: true,
                        reports: data.reports,
                        reported: data.reportsActive,
                        chats: true,
                    })}
                </div>
            );
        }

        if (!data.matches[0] && !data.chats[0]) {
            return (
                <div class='flex-full-height'>
                    {Tapbar(TapbarStore.get(), true)}
                    <div class='flex-wide-view-center'>
                        <div class='flex-wide-view-content'>
                            <div class='likes-view-text-big'>Здесь будут ваши пары и чаты</div>

                            <div class='view-content__dummy-image-container' style='min-height: 250px;'>
                                <img src='icons/chat_gradient.svg' class='view-content__dummy-image'></img>
                            </div>
                            <div class='likes-view-text-small'>Лайкайте карточки в ленте и возвращайтесь</div>
                        </div>
                    </div>
                </div>
            );
        }
        if (!data.chat)
            return (
                <div class='flex-full-height'>
                    {Tapbar(TapbarStore.get(), true)}
                    <div class='chats'>
                        {SearchField()}
                        {Matches(data.matches)}
                        {Chats(data.chats)}
                    </div>
                    <div class='chat__side__container'>
                        <div class='flex-center-column'>
                            <div style='margin-bottom: 36px; font-size: 24px'>Выберите чат</div>
                            <img src='icons/chat_gradient.svg' class='view-content__dummy-image'></img>
                        </div>
                    </div>
                </div>
            );
        return (
            // broken mb
            <div class='flex-full-height'>
                {Tapbar(TapbarStore.get(), true)}
                <div class='chats'>
                    {SearchField()}
                    {Matches(data.matches)}
                    {Chats(data.chats)}
                </div>
                <div class='chat__side__container'>
                    <div class='chat'>
                        {Chat(data.chat, true)}{Errors(data.error)}
                    </div>
                </div>
                {profile}
            </div>
        );
    }

    private chatsStoreUpdatesView(data, view) {
        view._data.chat = chatsManager.chat;
        view._data.chats = chatsManager.chatsWithMessages;

        view._template = view._createTmpl(view._data);

        view.render();
        if (!view._data.chat || !view._data.chat.profile || !view._data.chat.isOpenedProfile) {
            const _chatSpace = document.getElementsByClassName('chat__messages')[0];
            if (_chatSpace) {
                _chatSpace.scrollTop = _chatSpace.scrollHeight;
            }
            const _inputMsg = document.getElementsByTagName('input')[1];
            if (_inputMsg) {
                _inputMsg.focus();
            }
        } else {
            const _cardProfile = document.getElementsByClassName('card-profile')[0];
            if (_cardProfile) {
                _cardProfile.scrollTop = 0;
            }
        }
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

    private reportsSubscribtionCallback(data, view) {
        view._data.reports = data.reports;
        view._data.reportsActive = data.active;
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
