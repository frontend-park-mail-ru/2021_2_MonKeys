import eventBus from '../../dispatcher/eventBus.js';
import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { TapbarItem, tapbarItemProps } from './tapbarItem.js';
import { EVENTS } from '../../dispatcher/events.js';

export interface tapbarProps {
    activeItem: string;
}

export const Tapbar = (props: tapbarProps, vertical?: boolean) => {
    console.log(props);
    console.log(props.activeItem === 'profile');
    if (vertical) {
        const items: tapbarItemProps[] = [
            {
                route: '/feed',
                src: props.activeItem === 'feed' ? 'icons/feed_selected.svg' : 'icons/feed_unselected.svg',
                name: 'Лента',
            },
            {
                route: '/likes',
                src: props.activeItem === 'likes' ? 'icons/likes_selected.svg' : 'icons/likes_unselected.svg',
                name: 'Лайки',
            },
            {
                route: '/chats',
                src: props.activeItem === 'chats' ? 'icons/chat_selected.svg' : 'icons/chat_unselected.svg',
                name: 'Чаты',
            },
            {
                route: '/profile',
                src: props.activeItem === 'profile' ? 'icons/profile_selected.svg' : 'icons/profile_unselected.svg',
                name: 'Профиль',
            },
            {
                route: '/edit',
                src: 'icons/settings_unselected.svg',
                name: 'Настройки',
            },
            {
                route: '/login',
                action: () => {
                    eventBus.dispatch(EVENTS.PROFILE_LOGOUT_BUTTON);
                },
                src: 'icons/exit.svg',
                name: 'Выход',
            },
        ];

        return (
            <div class='tapbar tapbar-vertical'>
                <img src='icons/logo.svg' height='120' width='180' />
                {items.map((props) => TapbarItem(props))}
            </div>
        );
    }
    const items: tapbarItemProps[] = [
        {
            route: '/feed',
            src: props.activeItem === 'feed' ? 'icons/feed_selected.svg' : 'icons/feed_unselected.svg',
        },
        {
            route: '/likes',
            src: props.activeItem === 'likes' ? 'icons/likes_selected.svg' : 'icons/likes_unselected.svg',
        },
        {
            route: '/chats',
            src: props.activeItem === 'chats' ? 'icons/chat_selected.svg' : 'icons/chat_unselected.svg',
        },
        {
            route: '/profile',
            src: props.activeItem === 'profile' ? 'icons/profile_selected.svg' : 'icons/profile_unselected.svg',
        },
    ];

    return <div class='tapbar'>{items.map((props) => TapbarItem(props))}</div>;
};
