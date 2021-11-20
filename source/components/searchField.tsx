import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import eventBus from '../dispatcher/eventBus.js';
import reactions from '../constants/reactions.js';
import ViewBase from '../views/viewBase.js';

export interface SearchFieldProps {}

export const SearchField = () => {
    const searchEvent = () => {
        eventBus.dispatch('chat:search');
    };
    return (
        <form class='search-form'>
            <input oninput={searchEvent} type='text' placeholder='Поиск' class='search-form__input'/>
            <img src='icons2/search.svg' class='search-form__icon'/>
        </form>
    );
};
