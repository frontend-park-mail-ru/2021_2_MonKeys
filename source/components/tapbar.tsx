import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';

export interface tapbarProps {
    class: string;
}

export const Tapbar = (props: tapbarProps) => {
    let tapbarTmpl;

    switch (props.class) {
        case 'menu-icon':
            return (tapbarTmpl = (
                <div class='tapbar-container'>
                    <mon-router route='/feed'>
                        <button class='menu-icon'>
                            <img src='icons/tapbar_feed_white_selected.svg' class={props.class} />
                        </button>
                    </mon-router>
                    <mon-router route='/matches'>
                        <button class='menu-icon'>
                            <img src='icons/tapbar_likes_white_deselected.svg' class='menu-icon' />
                        </button>
                    </mon-router>
                    <mon-router route='/chat'>
                        <button class='menu-icon'>
                            <img src='icons/tapbar_chat_white_deselected.svg' class='menu-icon' />
                        </button>
                    </mon-router>
                    <mon-router route='/profile'>
                        <button class='menu-icon'>
                            <img src='icons/tapbar_user_white_deselected.svg' class='menu-icon' />
                        </button>
                    </mon-router>
                </div>
            ));
        case 'menu-icon':
            return (tapbarTmpl = (
                <div class='tapbar-container'>
                    <mon-router route='/feed'>
                        <button class='menu-icon'>
                            <img src='icons/tapbar_feed_white_deselected.svg' class='menu-icon' />
                        </button>
                    </mon-router>
                    <mon-router route='/matches'>
                        <button class='menu-icon'>
                            <img src='icons/tapbar_likes_white_selected.svg' class={props.class} />
                        </button>
                    </mon-router>
                    <mon-router route='/chat'>
                        <button class='menu-icon'>
                            <img src='icons/tapbar_chat_white_deselected.svg' class='menu-icon' />
                        </button>
                    </mon-router>
                    <mon-router route='/profile'>
                        <button class='menu-icon'>
                            <img src='icons/tapbar_user_white_deselected.svg' class='menu-icon' />
                        </button>
                    </mon-router>
                </div>
            ));
        case 'menu-icon':
            return (tapbarTmpl = (
                <div class='tapbar-container'>
                    <mon-router route='/feed'>
                        <button class='menu-icon'>
                            <img src='icons/tapbar_feed_white_deselected.svg' class='menu-icon' />
                        </button>
                    </mon-router>
                    <mon-router route='/matches'>
                        <button class='menu-icon'>
                            <img src='icons/tapbar_likes_white_deselected.svg' class='menu-icon' />
                        </button>
                    </mon-router>
                    <mon-router route='/chat'>
                        <button class='menu-icon'>
                            <img src='icons/tapbar_chat_white_selected.svg' class={props.class} />
                        </button>
                    </mon-router>
                    <mon-router route='/profile'>
                        <button class='menu-icon'>
                            <img src='icons/tapbar_user_white_deselected.svg' class='menu-icon' />
                        </button>
                    </mon-router>
                </div>
            ));
        case 'menu-icon':
            return (tapbarTmpl = (
                <div class='tapbar-container'>
                    <mon-router route='/feed'>
                        <button class='menu-icon'>
                            <img src='icons/tapbar_feed_white_deselected.svg' class='menu-icon' />
                        </button>
                    </mon-router>
                    <mon-router route='/matches'>
                        <button class='menu-icon'>
                            <img src='icons/tapbar_likes_white_deselected.svg' class='menu-icon' />
                        </button>
                    </mon-router>
                    <mon-router route='/chat'>
                        <button class='menu-icon'>
                            <img src='icons/tapbar_chat_white_deselected.svg' class='menu-icon' />
                        </button>
                    </mon-router>
                    <mon-router route='/profile'>
                        <button class='menu-icon'>
                            <img src='icons/tapbar_user_white_selected.svg' class={props.class} />
                        </button>
                    </mon-router>
                </div>
            ));
    }
};
