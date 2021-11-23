import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import eventBus from '../../dispatcher/eventBus.js';
import { ProfileData } from '../../store/profileStore.js';

export interface MatchProfileProps {
    userData: ProfileData;
}

export const MatchProfile = (props: MatchProfileProps) => {
    const profileClick = () => {
        eventBus.dispatch('chats:new-chat', { chatID: props.userData.id, userData: props.userData });
    };
    return (
        <div class='match-profile' onclick={profileClick}>
            <img class='match-profile__match-img' src={props.userData.imgs[0]} />
            <span class='match-profile__match-name'>{props.userData.name}</span>
        </div>
    );
};
