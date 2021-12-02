import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import eventBus from '../../dispatcher/eventBus.js';
import { EVENTS } from '../../dispatcher/events.js';

export const SearchField = () => {
    const searchEvent = () => {
        eventBus.dispatch(EVENTS.CHAT_SEARCH);
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
