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
        console.log(' вы нажали на заголовок чата');
        EventBus.dispatch<number>('chat:open-profile', props.chatID);
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
