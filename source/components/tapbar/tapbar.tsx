import eventBus from '../../dispatcher/eventBus.js';
import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { TapbarItem, tapbarItemProps } from './tapbarItem.js';

export interface tapbarProps {
    activeItem: string;
}

export const Tapbar = (props: tapbarProps, vertical?: boolean) => {
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
                src: props.activeItem === 'edit' ? 'icons/settings.svg' : 'icons/settings.svg',
                name: 'Редактирование',
            },
            {
                route: '/login',
                action: () => {
                    eventBus.dispatch('profile:logout-button');
                },
                src: props.activeItem === 'profile' ? 'icons/exit.svg' : 'icons/exit.svg',
                name: 'Выход',
            },
        ];

        return <div class='tapbar tapbar-vertical'>{items.map((props) => TapbarItem(props))}</div>;
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
