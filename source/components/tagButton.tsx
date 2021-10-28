import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import ViewBase from '../views/viewBase.js';

export interface tagButtonProps {
    tagText: string;
    isActive?: boolean;
    onchange?: { (data, view?: ViewBase): void };
}

export const TagButton = (props: tagButtonProps) => {
    let tag: HTMLElement;
    if (props.isActive === undefined) {
        tag = <input onchange={props.onchange} type='checkbox' class='tag-checkbox'></input>;
    } else {
        tag = props.isActive ? (
            <input onchange={props.onchange} type='checkbox' class='tag-checkbox' checked='checked'></input>
        ) : (
            <input onchange={props.onchange} type='checkbox' class='tag-checkbox'></input>
        );
    }

    return (
        <label class='checkbox-btn'>
            {tag}
            <span>{props.tagText}</span>
        </label>
    );
};
