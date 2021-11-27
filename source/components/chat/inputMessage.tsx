import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { Chat as ChatData } from '../../store/chatsStore.js';
import EventBus from '../../dispatcher/eventBus.js';

export const InputMessage = (chat: ChatData) => {
    const inputEvent = () => {
        EventBus.dispatch<number>('chat:input-message', chat.fromUserID);
    };
    const enterSendEvent = (event) => {
        const enterKeyCode = 13;
        if (event.keyCode === enterKeyCode) {
            event.preventDefault();
            EventBus.dispatch<number>('chat:send-button', chat.fromUserID);
        }
    };
    const buttonSendEvent = () => {
        EventBus.dispatch<number>('chat:send-button', chat.fromUserID);
    };

    const inputValue = chat.draftMessage === undefined || chat.draftMessage === '' ? '' : chat.draftMessage;
    return (
        // <div class='input-message'>
        <form class='input-message'>
            <input
                type='text'
                class='input-message__field'
                placeholder='Сообщение'
                oninput={inputEvent}
                onkeypress={enterSendEvent}
                value={inputValue}
            />
            <button class='input-message__button-send' type='reset' onclick={buttonSendEvent}>
                <img class='input-message__icon-send' src='icons/send.svg' />
            </button>
        </form>
        // </div>
    );
};
