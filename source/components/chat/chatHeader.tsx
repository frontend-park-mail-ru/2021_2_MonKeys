import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import EventBus from '../../dispatcher/eventBus.js';

export interface ChatHeaderProps {
    chatID: number;
    userName: string;
    userImg: string;
}

export const ChatHeader = (props: ChatHeaderProps) => {
    const backButtonClick = () => {
        EventBus.dispatch<number>('chat:back-button', props.chatID);
    };
    const profileClick = () => {
        EventBus.dispatch<number>('chat:open-profile', props.chatID);
    };

    return (
        <div class='chat-header'>
            <img class='chat-header__button-back' src='icons/back.svg' onclick={backButtonClick} />
            <div class='chat-header__profile' onclick={profileClick}>
                <img class='chat-header__user-img' src={props.userImg} />
                <span class='chat-header__user-name'>{props.userName}</span>
            </div>
        </div>
    );
};
