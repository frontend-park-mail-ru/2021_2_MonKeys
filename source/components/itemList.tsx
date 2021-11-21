import eventBus from '../dispatcher/eventBus.js';
import { MonkeysVirtualDOM } from '../virtualDOM/virtualDOM.js';
import { IconButton } from './iconButton.js';
import { conditionalRendering } from '../tools/jsxTools.js';

export interface ItemListProps {
    title: string;
    items: ListItem[];
    open: boolean;
    valid: boolean;
}

export interface ListItem {
    value: string;
    selected: boolean;
}

const classMap = (valid: boolean) => {
    if (valid) {
        return {
            boxClass: 'form__item__list-valid',
        };
    } else {
        return {
            boxClass: 'form__field-invalid',
        };
    }
};

const conditionalReturn = (a, b, bool) => {
    if (bool) {
        return a;
    } else {
        return b;
    }
};

const processItems = (items: ListItem[]) => {
    const result = [];
    items.forEach((element) => {
        if (element.selected) {
            result.push(<div class='list-item-selected'>{element.value}</div>);
        } else {
            result.push(<div class='list-item-deselected'>{element.value}</div>);
        }
    });
    return result;
};

export const ItemList = (props: ItemListProps) => {
    const boxClass = classMap(props.valid).boxClass;
    return (
        <div class={boxClass}>
            <div class='flex_box_row_left'>
                <img
                    src={conditionalReturn('icons/shrink.svg', 'icons/expand_big.svg', props.open)}
                    class='form__field__icon'
                />
                {props.title}
            </div>

            {conditionalRendering(<div class='flex_box_row_left'>{processItems(props.items)}</div>, props.open)}
        </div>
    );
};