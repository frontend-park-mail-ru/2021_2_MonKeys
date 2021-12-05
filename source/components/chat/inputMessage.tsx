import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { Chat as ChatData } from '../../store/chatsStore.js';
import EventBus from '../../dispatcher/eventBus.js';
import { EVENTS } from '../../dispatcher/events.js';

export const InputMessage = (chat: ChatData) => {
    const inputEvent = () => {
        EventBus.dispatch<number>(EVENTS.CHAT_INPUT_MESSAGE, chat.fromUserID);
    };
    const enterSendEvent = (event) => {
        const enterKeyCode = 13;
        if (event.keyCode === enterKeyCode) {
            event.preventDefault();
            EventBus.dispatch<number>(EVENTS.CHAT_SEND_BUTTON, chat.fromUserID);
        }
    };
    const buttonSendEvent = () => {
        EventBus.dispatch<number>(EVENTS.CHAT_SEND_BUTTON, chat.fromUserID);
    };

    const inputValue = chat.draftMessage === undefined || chat.draftMessage === '' ? '' : chat.draftMessage;
    return (
        <form class='message-input chat__message-input'>
            <input
                type='text'
                class='message-input__field'
                placeholder='Сообщение'
                oninput={inputEvent}
                onkeypress={enterSendEvent}
                value={inputValue}
            />
            <button class='message-input__button-send' type='reset' onclick={buttonSendEvent}>
                <img class='message-input__icon-send' src='icons/send.svg' />
            </button>
        </form>
    );
};
