import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import eventBus from '../../dispatcher/eventBus.js';

export interface TagData {
    selected: boolean;
    value: string;
    clickEvent: number;
    class?: string;
}

export const Tag = (data: TagData) => {
    const props = {
        class: data.selected ? 'list-item-selected' : 'list-item-deselected',
        onclick: () => {
            eventBus.dispatch(data.clickEvent, data.value);
        },
    };

    props.class += ' ' + data.class;

    return (
        <div name='tag' class={props.class} onclick={props.onclick}>
            {data.value}
        </div>
    );
};
