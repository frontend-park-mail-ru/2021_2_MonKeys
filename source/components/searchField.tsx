import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import eventBus from '../dispatcher/eventBus.js';

export const SearchField = () => {
    const searchEvent = () => {
        eventBus.dispatch('chat:search');
    };
    return (
        <div class='view-content__search'>
            <form class='search-form'>
                <input oninput={searchEvent} type='text' placeholder='Поиск' class='search-form__input' />
                <img src='icons/search.svg' class='search-form__icon' />
            </form>
        </div>
    );
};
