import ViewBase from './viewBase.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { Tapbar } from '../components/tapbar.js';
import { CardLikes } from '../components/cardLikes.js';

export default class LikesView extends ViewBase {
    _data = {
        'matchesCount': '3',
        'matches': {
            1: {
                'name': 'Elon',
                'age': '20',
                'photoSrc': 'img/Elon_Musk_2015.jpg',
                'date': '20.01.2001',
            },
            2: {
                'name': 'Ilyagu',
                'age': '20',
                'photoSrc': 'img/kQH8O2s1DWU.jpg',
                'date': '20.01.2021',
            },
            3: {
                'name': 'Lenya',
                'age': '21',
                'photoSrc': 'img/wow.gif',
                'date': '20.01.2020',
            },
        },
        'tapbar': {
            class: 'menu-likes',
        },
    };
    _template = (
        <div>
            <div class='card-container'>
                <div class='likes-count'>You have {this._data.matchesCount} matches!</div>
                {Object.keys(this._data.matches).map((item) => CardLikes(this._data.matches[item]))}
            </div>
            {Tapbar(this._data.tapbar)}
        </div>
    );
}
