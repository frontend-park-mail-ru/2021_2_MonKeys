import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';

export interface IconButtonProps {
    type: string;
    class: string;
    src: string;
    onclick?: Function;
}

export const IconButton = (props: IconButtonProps) => {
    return (
        <button type={props.type} class='menu-icon'>
            <img onclick={props.onclick} src={props.src} class={props.class} />
        </button>
    );
};
