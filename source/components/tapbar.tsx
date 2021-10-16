import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";

export interface tapbarProps {
  class: string;
}

export const Tapbar = (props: tapbarProps) => {
    let tapbarTmpl: any;

    switch (props.class) {
        case 'menu-feed':
            return tapbarTmpl = (
                <div class="tapbar-container">
                    <button class="menu-icon">
                        <img
                            src="icons/tapbar_feed_white_selected.svg"
                            class={props.class}
                        />
                    </button>
                    <button class="menu-icon">
                        <img
                            src="icons/tapbar_likes_white_deselected.svg"
                            class="menu-likes"
                        />
                    </button>
                    <button class="menu-icon">
                        <img
                            src="icons/tapbar_chat_white_deselected.svg"
                            class="menu-chat"
                        />
                    </button>
                    <button class="menu-icon">
                        <img
                            src="icons/tapbar_user_white_deselected.svg"
                            class="menu-profile"
                        />
                    </button>
                </div>
            );
        case 'menu-likes':
            return tapbarTmpl = (
                <div class="tapbar-container">
                    <button class="menu-icon">
                        <img
                            src="icons/tapbar_feed_white_deselected.svg"
                            class="menu-feed"
                        />
                    </button>
                    <button class="menu-icon">
                        <img
                            src="icons/tapbar_likes_white_selected.svg"
                            class={props.class}
                        />
                    </button>
                    <button class="menu-icon">
                        <img
                            src="icons/tapbar_chat_white_deselected.svg"
                            class="menu-chat"
                        />
                    </button>
                    <button class="menu-icon">
                        <img
                            src="icons/tapbar_user_white_deselected.svg"
                            class="menu-profile"
                        />
                    </button>
                </div>
            );
        case 'menu-chat':
            return tapbarTmpl = (
                <div class="tapbar-container">
                    <button class="menu-icon">
                        <img
                            src="icons/tapbar_feed_white_deselected.svg"
                            class="menu-feed"
                        />
                    </button>
                    <button class="menu-icon">
                        <img
                            src="icons/tapbar_likes_white_deselected.svg"
                            class="menu-likes"
                        />
                    </button>
                    <button class="menu-icon">
                        <img
                            src="icons/tapbar_chat_white_selected.svg"
                            class={props.class}
                        />
                    </button>
                    <button class="menu-icon">
                        <img
                            src="icons/tapbar_user_white_deselected.svg"
                            class="menu-profile"
                        />
                    </button>
                </div>
            );
        case 'menu-profile':
            return tapbarTmpl = (
                <div class="tapbar-container">
                    <button class="menu-icon">
                        <img
                            src="icons/tapbar_feed_white_deselected.svg"
                            class="menu-feed"
                        />
                    </button>
                    <button class="menu-icon">
                        <img
                            src="icons/tapbar_likes_white_deselected.svg"
                            class="menu-likes"
                        />
                    </button>
                    <button class="menu-icon">
                        <img
                            src="icons/tapbar_chat_white_deselected.svg"
                            class="menu-chat"
                        />
                    </button>
                    <button class="menu-icon">
                        <img
                            src="icons/tapbar_user_white_selected.svg"
                            class={props.class}
                        />
                    </button>
                </div>
            );
    };
};
