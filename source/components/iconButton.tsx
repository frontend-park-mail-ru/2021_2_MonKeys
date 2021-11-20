import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import ViewBase from '../views/viewBase.js';

export interface IconButtonProps {
    type: string;
    class: string;
    src: string;
    onclick?: { (data, view?: ViewBase): void };
}

export const IconButton = (props: IconButtonProps) => {
    return (
        
            <img onclick={props.onclick} src={props.src} class={props.class} />
        
    );
};
