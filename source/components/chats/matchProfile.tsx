import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import eventBus from '../../dispatcher/eventBus.js';
import { ProfileData } from '../../store/profileStore.js';
import { EVENTS } from '../../dispatcher/events.js';
import { MatchesProfile } from '../../store/matchStore.js';
export interface MatchProfileProps {
    userData: MatchesProfile;
}

export const MatchProfile = (props: MatchProfileProps) => {
    const profile = props.userData;
    const modificator = profile.isNew
        ? ' match-profile__match-img_bordered'
        : '';
    const profileClick = () => {
        eventBus.dispatch(EVENTS.CHATS_NEW_CHAT, profile);
    };
    return (
        <div class='match-profile' onclick={profileClick}>
            <img class={'match-profile__match-img' + modificator} src={props.userData.imgs[0]} />
            <span class='match-profile__match-name'>{props.userData.name}</span>
        </div>
    );
};
