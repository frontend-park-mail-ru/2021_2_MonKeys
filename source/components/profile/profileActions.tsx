import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { IconButton } from '../common/iconButton.js';
import EventBus from '../../dispatcher/eventBus.js';

export const ProfileActions = () => {
    const items = {
        'logoutButton': {
            src: 'icons/exit.svg',
            class: 'profile__action',
            onclick: () => {
                EventBus.dispatch<string>('profile:logout-button');
            },
        },
        'settingButtons': {
            src: 'icons/settings.svg',
            class: 'profile__action',
            onclick: () => {
                EventBus.dispatch<string>('profile:edit-button');
            },
        },
    };

    return <div class='profile__manager'>{Object.keys(items).map((item) => IconButton(items[item]))}</div>;
};
