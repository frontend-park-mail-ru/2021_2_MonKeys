import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import EventBus from '../../dispatcher/eventBus.js';
import { EVENTS } from '../../dispatcher/events.js';
export interface ChatHeaderProps {
    chatID: number;
    userName: string;
    userImg: string;
}

export const ChatHeader = (props: ChatHeaderProps) => {
    const backButtonClick = () => {
        EventBus.dispatch<number>(EVENTS.CHAT_BACK_BUTTON, props.chatID);
    };
    const profileClick = () => {
        EventBus.dispatch<number>(EVENTS.CHAT_OPEN_PROFILE, props.chatID);
    };

    return (
        <div class='chat__header'>
            <img class='chat__button-back' src='icons/back.svg' onclick={backButtonClick} />
            <div class='profile-preview chat__profile-preview' onclick={profileClick}>
                <img class='profile-preview__img' src={props.userImg} />
                <span class='profile-preview__name'>{props.userName}</span>
            </div>
        </div>
    );
};
