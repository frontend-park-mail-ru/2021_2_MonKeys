import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';

export interface tapbarProps {
    activeItem: string;
}

const renderOnCondition = (bool: boolean, ifTrue, ifFalse) => {
    if (bool) {
        return ifTrue;
    } else {
        return ifFalse;
    }
};

export const Tapbar = (props: tapbarProps) => {
    return (
        <div class='tapbar-container'>
            <mon-router route='/feed'>
                {renderOnCondition(
                    props.activeItem === 'feed',
                    <img src='icons/feed_selected.svg' class='menu-icon' />,
                    <img src='icons/feed_unselected.svg' class='menu-icon' />
                )}
            </mon-router>
            <mon-router route='/matches'>
                {renderOnCondition(
                    props.activeItem === 'matches',
                    <img src='icons/likes_selected.svg' class='menu-icon' />,
                    <img src='icons/likes_unselected.svg' class='menu-icon' />
                )}
            </mon-router>
            <mon-router route='/chat'>
                {renderOnCondition(
                    props.activeItem === 'chat',
                    <img src='icons/chat_selected.svg' class='menu-icon' />,
                    <img src='icons/chat_unselected.svg' class='menu-icon' />
                )}
            </mon-router>
            <mon-router route='/profile'>
                {renderOnCondition(
                    props.activeItem === 'profile',
                    <img src='icons/profile_selected.svg' class='menu-icon' />,
                    <img src='icons/profile_unselected.svg' class='menu-icon' />
                )}
            </mon-router>
        </div>
    );
};
