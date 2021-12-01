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

export default class LikesView extends ViewBase {
    constructor(parent: HTMLElement) {
        super(parent);
        this.viewSize = viewSizes.slim;
        LikesStore.subscribe(this.subscribtionCallback, this);
        ReportsStore.subscribe(this.reportsSubscribtionCallback, this);
        ErrorStore.unsubscribe(this.errorStoreUpdatesView);
        this._template = this._createTmpl(this._data);

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

    _data = {
        'likesCount': LikesStore.get().likesCount,
        'likes': LikesStore.get().profiles,
        'reports': ReportsStore.get().reports,
        'reportsActive': ReportsStore.get().active,
        error: errorManager.error,
    };

    _createTmpl(data) {
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
