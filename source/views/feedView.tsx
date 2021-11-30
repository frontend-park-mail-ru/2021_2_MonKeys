import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Tapbar } from '../components/tapbar/tapbar.js';
import { CardFeed } from '../components/card/cardFeed.js';
import { CardExpended } from '../components/card/cardExpended.js';
import feedStore from '../store/feedStore.js';
import eventBus from '../dispatcher/eventBus.js';
import TapbarStore from '../store/tapbarStore.js';
import { errorManager, ErrorStore } from '../store/errorStore.js';
import { dropsBackground } from '../components/common/dropsBackground.js';
import { Errors } from '../components/error/errors.js';

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
            this._template = this._createTmpl(this._data, cardData.expanded);
        } else {
            this._template = (
                <div class='view-contant view-contant_align_center view-content_scroll-banned'>
                    <div
                        class='view-contant view-contant_align_center
                  view-content_scroll-banned view-content__max-height'
                    >
                        {dropsBackground()}
                        <div class='view-content__card'>
                            <div class='header-big'>Карточки кончились</div>
                        </div>
                        {Tapbar(TapbarStore.get())}
                    </div>
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
            withActions: true,
            feed: true,
        },
        tapbar: {
            class: 'card-bottom-panel_actions_action',
        },
        error: errorManager.error,
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
                <div class='view-contant view-contant_align_center view-content_scroll-banned'>
                    <div
                        class='view-contant view-contant_align_center
                  view-content_scroll-banned view-content__max-height'
                    >
                        {CardFeed(data.cardData)}
                        {Tapbar(TapbarStore.get())}
                        {Errors(data.error)}
                    </div>
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
                <div class='app__content--align-center'>
                    <div class='feed'>
                        <div class='profile__card feed__profile'>{CardExpended(data.cardData)}</div>
                        <div class='feed__tapbar'>{Tapbar(TapbarStore.get())}</div>
                        {Errors(data.error)}
                    </div>
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
        view._data.error = errorManager.error;
        view._template = view._createTmpl(view._data);
        view.render();
    }
}
