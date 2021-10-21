import ViewBase from "./viewBase.js";
import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";
import { Tapbar } from "../components/tapbar.js";
import { CardLikes } from "../components/cardLikes.js";
import { IconButton } from "../components/iconButton.js";
import { CardFeed } from "../components/cardFeed.js";

export default class FeedView extends ViewBase {
    _data = {
        'cardData': {
            'userData': {
                name: 'Ilyagu',
                age: '20',
                description: 'mda chel',
                photoSrc: '/img/aj1-V9h9GGM.jpg'
            },
            'buttons': {
                'dislikeButton': {
                    type: 'button',
                    src: 'icons/button_dislike_white.svg',
                    class: 'dislike-card',
                },
                'expandButton': {
                    type: 'button',
                    src: 'icons/button_expand_white.svg',
                    class: 'expand-card',
                },
                'likeButton': {
                    type: 'button',
                    src: 'icons/tapbar_likes_white_selected.svg',
                    class: 'like-card',
                },
            },
        },
        'tapbar': {
            class: 'menu-chat',
        },
    }
    _template = (
        <div>
            <div class="card-container">
                <div class="card3"></div>
                <div class="card3"></div>
                <div class="card2"></div>
                {CardFeed(this._data.cardData)}
            </div>
            {Tapbar(this._data.tapbar)}
        </div>
    );
}
