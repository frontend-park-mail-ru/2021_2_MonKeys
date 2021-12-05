import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import eventBus from '../../dispatcher/eventBus.js';
import reactions from '../../constants/reactions.js';
import { EVENTS } from '../../dispatcher/events.js';

export interface CardActionsProps {
    userID: number;
    feed?: boolean;
    expend: boolean;
}

export const CardActions = (props: CardActionsProps) => {
    let dislikeClick = () => {
        eventBus.dispatch(EVENTS.LIKES_REACTION, { userID: props.userID, reactionType: reactions.dislike });
    };
    let likeClick = () => {
        eventBus.dispatch(EVENTS.LIKES_REACTION, { userID: props.userID, reactionType: reactions.like });
    };
    let arrowTmpl;
    if (props.expend) {
        const expandClick = () => {
            eventBus.dispatch(EVENTS.LIKES_EXPAND_BUTTON, props.userID);
        };
        arrowTmpl = <img src='icons/expand_big.svg' class='actions__button-expand' onclick={expandClick} />;
    } else {
        const shrinkClick = () => {
            eventBus.dispatch(EVENTS.LIKES_SHRINK_BUTTON, props.userID);
        };
        arrowTmpl = <img src='icons/shrink.svg' class='actions__button-shrink' onclick={shrinkClick} />;
    }

    if (props.feed) {
        const shrinkClick = () => {
            eventBus.dispatch(EVENTS.FEED_SHRINK_BUTTON, props.userID);
        };
        arrowTmpl = <img src='icons/shrink.svg' class='actions__button-shrink' onclick={shrinkClick} />;
        dislikeClick = () => {
            eventBus.dispatch(EVENTS.FEED_DISLIKE_BUTTON, { userID: props.userID, reactionType: reactions.dislike });
        };
        likeClick = () => {
            eventBus.dispatch(EVENTS.FEED_LIKE_BUTTON, { userID: props.userID, reactionType: reactions.like });
        };
    }
    return (
        <div class='actions'>
            <img src='icons/dislike.svg' class='actions__button-dislike' onclick={dislikeClick} />
            {arrowTmpl}
            <img src='icons/likes.svg' class='actions__button-like' onclick={likeClick} />
        </div>
    );
};
