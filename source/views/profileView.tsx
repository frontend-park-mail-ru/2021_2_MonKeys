import ViewBase from "./viewBase.js";
import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";
import { Tapbar } from "../components/tapbar.js";
import { CardExpended } from "../components/cardExpended.js";


export default class ProfileView extends ViewBase {
    _data = {
        'cardData': {
            'userData': {
                name: 'Mikhail',
                age: '20',
                description: 'mda chel',
                photoSrc: '/img/aj1-V9h9GGM.jpg'
            },
            'tags': {
                1: {
                    text: 'anime',
                    isActive: false,
                },
                2: {
                    text: 'BMSTU',
                    isActive: false,
                },
                3: {
                    text: 'films',
                    isActive: false,
                }
            },
            'buttons': {
                'logoutButton': {
                    type: 'button',
                    src: 'icons/button_previous_white.svg',
                    class: 'profile-logout',
                },
                'editButton': {
                    type: 'button',
                    src: 'icons/button_edit_white.svg',
                    class: 'profile-edit',
                },
            },
        },
        'tapbar': {
            class: 'menu-profile',
        },
    }
    _template = (
        <div>
            <div class="card-container">
                {CardExpended(this._data.cardData)}
            </div>
            {Tapbar(this._data.tapbar)}
        </div>
    );
}
