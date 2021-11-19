import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';

export interface MessageData {
    text: string;
    fromID: string;
}

export const Message = (data: MessageData) => {
    const textClass = data.fromID === '1' ? 'my-message' : 'not-my-message';

    return <div class={textClass}>{data.text}</div>;
};
