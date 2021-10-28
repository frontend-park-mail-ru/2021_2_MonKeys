import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';

export const Tag = (text: string) => {
    return (
        <label class='checkbox-btn'>
            <input type='checkbox' class='tag-checkbox'></input>
            <span>{text}</span>
        </label>
    );
};
