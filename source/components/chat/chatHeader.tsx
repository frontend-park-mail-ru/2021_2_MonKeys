import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { Button } from '../button.js';
import EventBus from '../../dispatcher/eventBus.js';

export interface ChatHeaderProps {
    userName: string;
    userImg: string;
}

export const ChatHeader = (props: ChatHeaderProps) => {
    // const props = {
    //     backButton: {
    //         type: 'button',
    //         text: 'Назад',
    //         class: '',
    //         onclick: () => {
    //             EventBus.dispatch<string>('chat:back-button');
    //         },
    //     },
    // };
    const backButtonClick = () => {
        EventBus.dispatch<string>('chat:back-button');
    }
    const profileClick = () => {
        EventBus.dispatch<string>('chat:profile-button');
    }

    return (
        <div class='chat-header'>
            <img class='chat-header__button-back' src='icons/back.svg' onclick={backButtonClick} />
            {/* {Button(props.backButton)} */}
            <div class='chat-header__profile' onclick={profileClick}>
                <img class='chat-header__user-img' src={props.userImg}/>
                <span class='chat-header__user-name'>{props.userName}</span>
            </div>
        </div>
    );
};
