import eventBus from '../../dispatcher/eventBus.js';
import { MonkeysVirtualDOM } from '../../virtualDOM/virtualDOM.js';
import { conditionalRendering } from '../../utils/tsxTools/jsxTools.js';

export interface ItemListProps {
    title: string;
    items: ListItem[];
    open: boolean;
    openable: boolean;
    valid: boolean;
    buttonEvent: string;
    alignCenter?: boolean;
}

export interface ListItem {
    value: string;
    selected: boolean;
    clickEvent: string;
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

const conditionalReturn = (a: string, b: string, bool: boolean) => {
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
            result.push(
                <div
                    name='tag'
                    class='list-item-selected'
                    onclick={() => {
                        eventBus.dispatch(element.clickEvent, element.value);
                    }}
                >
                    {element.value}
                </div>
            );
        } else {
            result.push(
                <div
                    name='tag'
                    class='list-item-deselected'
                    onclick={() => {
                        eventBus.dispatch(element.clickEvent, element.value);
                    }}
                >
                    {element.value}
                </div>
            );
        }
    });
    return result;
};

export const ItemList = (props: ItemListProps) => {
    const boxClass = classMap(props.valid).boxClass;
    const aligning = props.alignCenter ? 'flex_box_row_center' : 'flex_box_row_left';
    return (
        <div class={boxClass}>
            <div class={aligning}>
                {props.title}
                {conditionalRendering(
                    <img
                        src={conditionalReturn('icons/shrink.svg', 'icons/expand_big.svg', props.open)}
                        class='form__field__icon form__field__icon_small-padding-top'
                        onclick={() => {
                            eventBus.dispatch(props.buttonEvent);
                        }}
                    />,
                    props.openable
                )}
            </div>
            {conditionalRendering(<div class='flex_box_row_left'>{processItems(props.items)}</div>, props.open)}
        </div>
    );
};