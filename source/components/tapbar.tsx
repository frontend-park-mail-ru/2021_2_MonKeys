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
        <div class='tapbar'>
            <mon-router route='/feed'>
                {renderOnCondition(
                    props.activeItem === 'feed',
                    <img src='icons/feed_selected.svg' class='tapbar_item' />,
                    <img src='icons/feed_unselected.svg' class='tapbar_item' />
                )}
            </mon-router>
            <mon-router route='/matches'>
                {renderOnCondition(
                    props.activeItem === 'matches',
                    <img src='icons/likes_selected.svg' class='tapbar_item' />,
                    <img src='icons/likes_unselected.svg' class='tapbar_item' />
                )}
            </mon-router>
            <mon-router route='/chats'>
                {renderOnCondition(
                    props.activeItem === 'chats',
                    <img src='icons/chat_selected.svg' class='tapbar_item' />,
                    <img src='icons/chat_unselected.svg' class='tapbar_item' />
                )}
            </mon-router>
            <mon-router route='/profile'>
                {renderOnCondition(
                    props.activeItem === 'profile',
                    <img src='icons/profile_selected.svg' class='tapbar_item' />,
                    <img src='icons/profile_unselected.svg' class='tapbar_item' />
                )}
            </mon-router>
        </div>
    );
};
