import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import eventBus from '../../dispatcher/eventBus.js';
import reactions from '../../constants/reactions.js';

export interface CardActionsProps {
    userID: number;
    feed?: boolean;
    expend: boolean;
}

export const CardActions = (props: CardActionsProps) => {
    let dislikeClick = () => {
        eventBus.dispatch('likes:reaction', { userID: props.userID, reactionType: reactions.dislike });
    };
    let likeClick = () => {
        eventBus.dispatch('likes:reaction', { userID: props.userID, reactionType: reactions.like });
    };
    let arrowTmpl;
    if (props.expend) {
        const expandClick = () => {
            eventBus.dispatch('likes:expand-button', props.userID);
        };
        arrowTmpl = <img src='icons/expand_big.svg' class='actions__button-expand' onclick={expandClick} />;
    } else {
        const shrinkClick = () => {
            eventBus.dispatch('likes:shrink-button', props.userID);
        };
        arrowTmpl = <img src='icons/shrink.svg' class='actions__button-shrink' onclick={shrinkClick} />;
    }

    if (props.feed) {
        const shrinkClick = () => {
            eventBus.dispatch('feed:shrink-button', props.userID);
        };
        arrowTmpl = <img src='icons/shrink.svg' class='actions__button-shrink' onclick={shrinkClick} />;
        dislikeClick = () => {
            eventBus.dispatch('feed:dislike-button', { userID: props.userID, reactionType: reactions.dislike });
        };
        likeClick = () => {
            eventBus.dispatch('feed:like-button', { userID: props.userID, reactionType: reactions.like });
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
