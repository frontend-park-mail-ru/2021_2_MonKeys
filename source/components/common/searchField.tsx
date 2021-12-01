import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import eventBus from '../../dispatcher/eventBus.js';

export const SearchField = () => {
    const searchEvent = () => {
        eventBus.dispatch('chat:search');
    };
    return (
        <div class='chats__search'>
            <form class='search-form chats__search-form'>
                <input class='search-form__input' oninput={searchEvent} type='text' placeholder='Поиск' />
                <img class='search-form__icon' src='icons/search.svg' />
            </form>
        </div>
    );
};
