import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { conditionalRendering } from '../tools/jsxTools.js';

export const Tag = (text: string, edit?: boolean) => {
    return (
        <label class='checkbox-btn'>
            <span>{text}</span>
        </label>
    );
};
