import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { IconButton } from '../common/iconButton.js';
import EventBus from '../../dispatcher/eventBus.js';
import { EVENTS } from '../../dispatcher/events.js';

export const ProfileActions = () => {
    const items = {
        'logoutButton': {
            src: 'icons/exit.svg',
            class: 'profile__action',
            onclick: () => {
                EventBus.dispatch<string>(EVENTS.PROFILE_LOGOUT_BUTTON);
            },
        },
        'settingButtons': {
            src: 'icons/settings.svg',
            class: 'profile__action',
            onclick: () => {
                EventBus.dispatch<string>(EVENTS.PROFILE_EDIT_BUTTON);
            },
        },
    };

    return <div class='profile__manager'>{Object.keys(items).map((item) => IconButton(items[item]))}</div>;
};
