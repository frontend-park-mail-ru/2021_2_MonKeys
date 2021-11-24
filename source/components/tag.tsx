import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';

export const Tag = (text: string) => {
    return (
        <label class='checkbox-btn'>
            <span>{text}</span>
        </label>
    );
};
