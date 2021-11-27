import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { Message as MessageData } from '../../store/chatsStore.js';
import { ProfileStore } from '../../store/profileStore.js';

export const Message = (msg: MessageData) => {
    // console.log(typeof msg.date)
    // console.log(msg.date.getFullYear())
    // console.log(msg.date.getMonth())
    // console.log(msg.date.getDate)
    // console.log(msg.date.getHours())
    // console.log(msg.date.getMinutes())
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
                <span class='message-container__date'>{msg.date}</span>
            </div>
        </div>
    );
};
