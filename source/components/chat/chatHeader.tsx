import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { FormField } from '../formField.js';
import { Button } from '../button.js';
import EventBus from '../../dispatcher/eventBus.js';

export const ChatHeader = (data) => {
    const props = {};

    return <div class=''>{data.username}</div>;
};
