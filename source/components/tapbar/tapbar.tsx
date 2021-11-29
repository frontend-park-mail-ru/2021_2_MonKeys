import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { TapbarItem, tapbarItemProps } from './tapbarItem.js';

export interface tapbarProps {
    activeItem: string;
}

export const Tapbar = (props: tapbarProps) => {
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

    return (
        <div class='view-content__tapbar'>
            <div class='tapbar'>{items.map((props) => TapbarItem(props))}</div>
        </div>
    );
};
