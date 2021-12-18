/* eslint-disable max-len */
import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { viewSizes } from '../constants/viewParams.js';
import { Tapbar } from '../components/tapbar/tapbar.js';
import { ImgCard } from '../components/card/imgCard.js';
import LikesStore from '../store/likesStore.js';
import ReportsStore from '../store/reportsStore.js';
import TapbarStore from '../store/tapbarStore.js';
import { CardExpended } from '../components/card/cardExpended.js';
import { userLikesRequset } from '../requests/likesRequest.js';
import { errorManager, ErrorStore } from '../store/errorStore.js';
import eventBus from '../dispatcher/eventBus.js';
import { EVENTS } from '../dispatcher/events.js';
import { Errors } from '../components/error/errors.js';
import {
    bigPeriod,
    bigPeriodPrice,
    mediumPeriod,
    mediumPeriodPrice,
    smallPeriod,
    smallPeriodPrice,
} from '../constants/payment.js';
import { subscriptionRequest } from '../requests/subscriptionRequest.js';
import { PaymentCard } from '../components/common/paymentCard.js';
import { Button } from '../components/common/button.js';

export default class LikesWideView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        this.viewSize = viewSizes.wide;
        LikesStore.subscribe(this.subscribtionCallback, this);
        ReportsStore.subscribe(this.reportsSubscribtionCallback, this);
        ErrorStore.unsubscribe(this.errorStoreUpdatesView);
        this._template = this._createTmpl(this._data);

        subscriptionRequest().then((data) => {
            console.log(data);
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
            class: 'button-white-small',
            onclick: () => {
                eventBus.dispatch<string>(EVENTS.LIKES_PAYMENT);
            },
        },
    };

    _createTmpl(data) {
        if (!LikesStore.get().active) {
            return (
                <div class='flex-full'>
                    {Tapbar(TapbarStore.get(), true)}
                    <div class='flex-wide-view-center'>
                        <div class='flex-wide-likes'>
                            <div class='likes-view-text-big'>
                                Вы можете оформить подписку, чтобы видеть, кому вы понравились
                            </div>

                            <div class='view-content__dummy-payment-container'>
                                {PaymentCard({
                                    period: smallPeriod,
                                    price: smallPeriodPrice,
                                    class: LikesStore.get().card150Class,
                                    iconSrc: 'icons/heart_gradient.svg',
                                })}
                                {PaymentCard({
                                    period: mediumPeriod,
                                    price: mediumPeriodPrice,
                                    class: LikesStore.get().card350Class,
                                    iconSrc: 'icons/several_hearts_gradient.svg',
                                })}
                                {PaymentCard({
                                    period: bigPeriod,
                                    price: bigPeriodPrice,
                                    class: LikesStore.get().card650Class,
                                    iconSrc: 'icons/lot_hearts_gradient.svg',
                                })}
                                {Button(data.paymentButton)}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        if (!LikesStore.get().profiles[0]) {
            return (
                <div class='flex-full'>
                    {Tapbar(TapbarStore.get(), true)}
                    <div class='flex-wide-view-center'>
                        <div class='flex-wide-likes'>
                            <div class='likes-view-text-big'>У вас пока нет новых лайков</div>

                            <div class='view-content__dummy-image-container' style='min-height: 250px;'>
                                <img src='icons/like_gradient.svg' class='view-content__dummy-image'></img>
                            </div>
                            <div class='likes-view-text-small'>Лайкайте карточки в ленте и возвращайтесь</div>
                        </div>
                    </div>
                </div>
            );
        }
        if (!LikesStore.get().expended) {
            return (
                //mb broken
                <div class='flex-full-height'>
                    {Tapbar(TapbarStore.get(), true)}
                    <div class='app__content--align-center'>
                        <div class='likes'>
                            <div class='likes__likes-header'>
                                <div class='likes-view-header'>Вы понравились нескольким людям</div>
                            </div>
                            <div class='likes__likes-profile'>
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
                            {Errors(data.error)}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div class='flex-full'>
                    {Tapbar(TapbarStore.get(), true)}
                    <div class='flex-wide-view-center'>
                        <div class='flex-wide-feed'>
                            <div class='profile'>
                                <div class='profile__card'>
                                    {CardExpended({
                                        userData: data.likes[LikesStore.get().userIndex],
                                        withActions: true,
                                        withReports: true,
                                        reports: data.reports,
                                        reported: data.reportsActive,
                                    })}
                                </div>
                                {Errors(data.error)}
                            </div>
                        </div>
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
