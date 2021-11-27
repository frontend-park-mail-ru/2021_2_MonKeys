import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { Message as MessageData } from '../../store/chatsStore.js';
import { ProfileStore } from '../../store/profileStore.js';

export const Message = (msg: MessageData) => {
    const msgYear = msg.date.getFullYear().toString();
    const msgMonth = msg.date.getMonth().toString();
    const msgDate = msg.date.getDate().toString();
    const msgHourse = msg.date.getHours().toString();
    let msgMinutes = msg.date.getMinutes().toString();
    if (msgMinutes.length === 1) {
        msgMinutes  = '0' + msgMinutes;
    }

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed)
    let date = msgHourse + ':' + msgMinutes;
    if (today.getDate().toString() !== msgDate) {
        date = date + ' ' + msgDate + '.' + msgMonth + '.' + msgYear;
    }
    const textClass = msg.fromID === ProfileStore.get().id
        ? 'message-container__message message-container__message_my-message'
        : 'message-container__message message-container__message_not-my-message';
    const messageContainerClass = msg.fromID === ProfileStore.get().id
        ? 'message-container message-container_my-message'
        : 'message-container message-container_not-my-message';

    return (
        <div>
            <div class={messageContainerClass}>
                <div class={textClass}>
                    <span class='message-container__text'>{msg.text}</span>
                </div>
            </div>
            <div class={messageContainerClass}>
                <span class='message-container__date'>{date}</span>
            </div>
        </div>
    );
};
