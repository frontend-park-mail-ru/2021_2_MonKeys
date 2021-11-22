import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import ViewBase from '../views/viewBase.js';

export interface IconButtonProps {
    type: string;
    class: string;
    src: string;
    onclick?: { (data, view?: ViewBase): void };
    alt?: string;
}

export const IconButton = (props: IconButtonProps) => {
    if (!props.alt) {
        props.alt = 'untracked';
    }
    return <img onclick={props.onclick} src={props.src} class={props.class} alt={props.alt} />;
};
