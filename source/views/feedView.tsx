import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Tapbar } from '../components/tapbar.js';
import { CardFeed } from '../components/cardFeed.js';
import { CardExpended } from '../components/cardExpended.js';
import feedStore from '../store/feedStore.js';
import eventBus from '../dispatcher/eventBus.js';
import { OutOfCards } from '../components/outOfCards.js';

import { CritError } from '../components/critError.js';

import TapbarStore from '../store/tapbarStore.js';
import { ErrorStore } from '../store/errorStore.js';

export default class FeedView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);

        const cardData = feedStore.get();
        this.updateDataTemaplate(cardData);
        feedStore.subscribe(this.subscribtionCallback, this);
        ErrorStore.subscribe(this.errorStoreUpdatesView, this);
    }

    private updateDataTemaplate(cardData) {
        if (!cardData.outOfCards) {
            this._data.cardData.userData = cardData.profiles[cardData.counter];
            this._data.critError.loading = cardData.apiErrorLoadCondition;
            this._template = this._createTmpl(this._data, cardData.expanded);
        } else {
            this._template = (
                <div class='card-container overflow-hidden'>
                    {OutOfCards()}
                    {Tapbar(TapbarStore.get())}
                    {CritError(this._data.critError)}
                </div>
            );
        }
    }
    _data = {
        cardData: {
            userData: feedStore.get().profiles,
            buttons: {
                dislikeButton: {
                    type: 'button',
                    src: 'icons/dislike.svg',
                    alt: 'dislike',
                    class: 'card-bottom-panel_actions_action',
                    onclick: () => {
                        eventBus.dispatch('feed:dislike-button');
                    },
                },
                expandButton: {
                    type: 'button',
                    src: 'icons/expand_big.svg',
                    class: 'card-bottom-panel_actions_action',
                    onclick: () => {
                        eventBus.dispatch('feed:expand-button');
                    },
                },
                likeButton: {
                    type: 'button',
                    src: 'icons/likes.svg',
                    alt: 'like',
                    class: 'card-bottom-panel_actions_action',
                    onclick: () => {
                        eventBus.dispatch('feed:like-button');
                    },
                },
            },
            feed: true,
        },
        tapbar: {
            class: 'card-bottom-panel_actions_action',
        },
        critError: {
            title: 'Ошибка подключения',
            text: 'Не удаётся подключиться к серверу. Проверь подключение к Интернету и попробуй снова.',
            loading: ErrorStore.get().apiErrorLoadCondition,
        },
    };

    forceRender() {
        const cardData = feedStore.get();
        this._template = this._createTmpl(this._data, cardData.expanded);
        this.render();
    }

    _createTmpl(data, expanded: boolean) {
        if (!expanded) {
            this._data.cardData.buttons.expandButton = {
                type: 'button',
                src: 'icons/expand_big.svg',
                class: 'card-bottom-panel_actions_action',
                onclick: () => {
                    eventBus.dispatch('feed:expand-button');
                },
            };

            return (
                <div class='flex_box_column_center overflow-hidden'>
                    {CardFeed(data.cardData)}
                    {Tapbar(TapbarStore.get())}
                    {/* {CritError(data.critError)} */}
                </div>
            );
        } else {
            this._data.cardData.buttons.expandButton = {
                type: 'button',
                src: 'icons/button_shrink_white.svg',
                class: 'card-bottom-panel_actions_action',
                onclick: () => {
                    eventBus.dispatch('feed:shrink-button');
                },
            };
            return (
                <div class='flex_box_column_center overflow-hidden'>
                    {CardExpended(data.cardData)}
                    {Tapbar(data.tapbar)}
                    {/* {CritError(data.critError)} */}
                </div>
            );
        }
    }

    public unsubscribe() {
        feedStore.unsubscribe(this.subscribtionCallback);
        ErrorStore.unsubscribe(this.errorStoreUpdatesView);
    }

    private subscribtionCallback(data, view) {
        const cardData = feedStore.get();
        view.updateDataTemaplate(cardData);
        view.render();
    }

    private errorStoreUpdatesView(data, view) {
        view._data.critError.loading = data.apiErrorLoadCondition;
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
