import ViewBase from './viewBase.js';
import { viewSizes } from '../constants/viewParams.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Tapbar } from '../components/tapbar/tapbar.js';
import { ImgCard } from '../components/card/imgCard.js';
import LikesStore from '../store/likesStore.js';
import ReportsStore from '../store/reportsStore.js';
import TapbarStore from '../store/tapbarStore.js';
import { CardExpended } from '../components/card/cardExpended.js';
import { userLikesRequset } from '../requests/likesRequest.js';
import { errorManager, ErrorStore } from '../store/errorStore.js';
import { Errors } from '../components/error/errors.js';
import { PaymentCard } from '../components/common/paymentCard.js';
import { Button } from '../components/common/button.js';
import eventBus from '../dispatcher/eventBus.js';
import { EVENTS } from '../dispatcher/events.js';
import {
    bigPeriod,
    bigPeriodPrice,
    mediumPeriod,
    mediumPeriodPrice,
    smallPeriod,
    smallPeriodPrice,
} from '../constants/payment.js';
import { subscriptionRequest } from '../requests/subscriptionRequest.js';

export default class LikesView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        this.viewSize = viewSizes.slim;
        LikesStore.subscribe(this.subscribtionCallback, this);
        ReportsStore.subscribe(this.reportsSubscribtionCallback, this);
        ErrorStore.unsubscribe(this.errorStoreUpdatesView);
        this._template = this._createTmpl(this._data);

        subscriptionRequest().then((data) => {
            const likesData = LikesStore.get();
            likesData.active = data.body.subscriptionActive;
            LikesStore.set(likesData);
            if (likesData.active) {
                userLikesRequset().then((data) => {
                    const likesData = LikesStore.get();
                    likesData.profiles = data.body.allUsers;
                    likesData.likesCount = data.body.likesCount;
                    likesData.expended = false;
                    likesData.reported = false;
                    likesData.userIndex = 0;
                    LikesStore.set(likesData);
                });
            }
        });
    }

    _data = {
        'likesCount': LikesStore.get().likesCount,
        'likes': LikesStore.get().profiles,
        'reports': ReportsStore.get().reports,
        'reportsActive': ReportsStore.get().active,
        error: errorManager.error,
        paymentButton: {
            type: 'button',
            text: 'Оплатить',
            class: 'button-white-big payment-card__button',
            onclick: () => {
                eventBus.dispatch<string>(EVENTS.LIKES_PAYMENT);
            },
        },
    };

    _createTmpl(data) {
        // нет подписки
        if (!LikesStore.get().active) {
            return (
                <div class='app__content--align-center'>
                    <div class='likes-payment'>
                        <div class='likes-view-text-big'>
                            Вы можете оформить подписку, чтобы видеть, кому вы понравились
                        </div>
                        <div class='likes__dummy-payment-container'>
                            {PaymentCard({
                                period: smallPeriod,
                                price: smallPeriodPrice,
                                class: LikesStore.get().card150Class,
                                iconSrc: 'icons/heart_gradient.svg',
                                iconSize: 'small',
                            })}
                            {PaymentCard({
                                period: mediumPeriod,
                                price: mediumPeriodPrice,
                                class: LikesStore.get().card350Class,
                                iconSrc: 'icons/several_hearts_gradient.svg',
                                iconSize: 'medium',
                            })}
                            {PaymentCard({
                                period: bigPeriod,
                                price: bigPeriodPrice,
                                class: LikesStore.get().card650Class,
                                iconSrc: 'icons/lot_hearts_gradient.svg',
                                iconSize: 'big',
                            })}
                            {Button(data.paymentButton)}
                        </div>
                        {Tapbar(TapbarStore.get())}
                        {Errors(data.error)}
                    </div>
                </div>
            );
        }
        if (!LikesStore.get().profiles[0]) {
            return (
                <div class='view-contant view-contant_align_center view-content_scroll-banned'>
                    <div
                        class='view-contant view-contant_align_center
                view-content_scroll-banned view-content__max-height'
                    >
                        <div class='likes-view-text-big'>У вас пока нет новых лайков</div>

                        <div class='view-content__dummy-image-container'>
                            <img src='icons/like_gradient.svg' class='view-content__dummy-image'></img>
                        </div>
                        <div class='likes-view-text-small'>Лайкайте карточки в ленте и возвращайтесь</div>

                        {Tapbar(TapbarStore.get())}
                        {Errors(data.error)}
                    </div>
                </div>
            );
        }
        if (!LikesStore.get().expended) {
            return (
                <div class='app__content--align-center'>
                    <div class='likes'>
                        <div class='likes__likes-profile'>
                            <div class='likes__likes-header'>
                                <div class='likes-view-header'>Вы понравились нескольким людям</div>
                            </div>
                            <div class='likes-view-cards'>
                                {Object.keys(data.likes).map((item) =>
                                    ImgCard({
                                        userData: data.likes[item],
                                        size: 'small',
                                        withActions: true,
                                        expanded: true,
                                    })
                                )}
                            </div>
                        </div>
                        <div class='likes__tapbar'>{Tapbar(TapbarStore.get())}</div>
                        {Errors(data.error)}
                    </div>
                </div>
            );
        } else {
            return (
                <div class='app__content--align-center'>
                    <div class='likes'>
                        <div class='profile__card likes__profile'>
                            {CardExpended({
                                userData: data.likes[LikesStore.get().userIndex],
                                withActions: true,
                                withReports: true,
                                reports: data.reports,
                                reported: data.reportsActive,
                            })}
                        </div>
                        <div class='likes__tapbar'>{Tapbar(TapbarStore.get())}</div>
                        {Errors(data.error)}
                    </div>
                </div>
            );
        }
    }

    public unsubscribe() {
        LikesStore.unsubscribe(this.subscribtionCallback);
        ReportsStore.unsubscribe(this.reportsSubscribtionCallback);
    }

    private subscribtionCallback(data, view) {
        view._data.likes = data.profiles;
        view._data.likesCount = data.likesCount;
        view._template = view._createTmpl(view._data);
        view.render();
    }
    forceRender() {
        this._data = {
            'likesCount': LikesStore.get().likesCount,
            'likes': LikesStore.get().profiles,
            'reports': ReportsStore.get().reports,
            'reportsActive': ReportsStore.get().active,
            error: errorManager.error,
            paymentButton: {
                type: 'button',
                text: 'Оплатить',
                class: '',
                onclick: () => {
                    eventBus.dispatch<string>(EVENTS.LIKES_PAYMENT);
                },
            },
        };
        this._template = this._createTmpl(this._data);
        this.render();
    }
    private errorStoreUpdatesView(data, view) {
        view._data.error = errorManager.error;
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
